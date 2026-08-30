from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from core.config import settings
from core.security import (
    hash_password,
    create_access_token,
    create_refresh_token,
    verify_password
)

from features.auth.models import User
from features.magic_link.services import create_magic_link
from .schemas import UserCreate, Login


async def check_email(
    db: AsyncSession,
    email: str
) -> bool:
    stmt = select(User.email).where(User.email == email)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if user:
        return True
    else:
        return False


async def create_user(
    db: AsyncSession,
    data: UserCreate
):
    if not await check_email(db, data.email):
        if (
            (data.password == data.comfirmedPassword)
            and len(data.password) >= 8
            and len(data.name) >= 1
            and data.name[0] != ' '
        ):
            user = User(
                email=data.email,
                name=data.name,
                hashed_password=hash_password(data.password),
                verification=0
            )

            db.add(user)
            await db.commit()
            await db.refresh(user)

            # Для теста
            magic_link = await create_magic_link(
                db=db,
                email=data.email,
                action=1
            )

            if settings.DEBUG:
                return {
                    'magic_link': magic_link,
                    'success': True
                }
            else:
                return {
                    'success': True
                }
        else:
            raise HTTPException(
                status_code=422,
                detail='Невалидные данные'
            )
    else:
        raise HTTPException(
            status_code=409,
            detail='Пользователь с этой эл. почтой уже существует'
        )


async def authorize(
    db: AsyncSession,
    data: Login
):
    if check_email(db, data.email):
        stmt = select(User.hashed_password).where(
            User.email == data.email
        )
        result = await db.execute(stmt)
        hashed_password = result.scalar_one_or_none()

        if verify_password(hashed_password, data.password):   # type: ignore
            stmt = select(User.id).where(
                User.email == data.email
            )
            
            id_result = await db.execute(stmt)
            id = id_result.scalar_one_or_none()
            
            return {
                'access_token': create_access_token(id, data.email),   # type: ignore
                'refresh_token': await create_refresh_token(db, data.email)
            }
        else:
            raise HTTPException(
                status_code=401,
                detail='Неправильный пароль'
            )
    else:
        raise HTTPException(
            status_code=404,
            detail='Пользователя не существует'
        )