import secrets
import hashlib

from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
from sqlalchemy import (
    select,
    delete,
    or_,
    update
)
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings
from core.security import (
    create_access_token,
    create_refresh_token
)

from features.auth.models import User
from .models import MagicLink
from .schemas import SendMagicLink

from shared.utc_time import ensure_utc


def create_full_magic_link(
    token: str,
    email: str,
    action: int
):
    return f'http://{settings.HOST}:{settings.PORT}/verify?token={token}&action={str(action)}&email={email}'


async def save_magic_link(
    db: AsyncSession,
    key: str,
    email: str,
    action: int,
    number: int
):
    magic_link = MagicLink(
        key=key,
        email=email,
        action=action,
        number=number
    )

    db.add(magic_link)
    await db.commit()
    await db.refresh(magic_link)


async def create_magic_link(
    db: AsyncSession,
    email: str,
    action: int
):
    # Проверяем существование пользователя в БД
    stmt = select(User.email).where(User.email == email)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()

    if user:
        stmt = select(MagicLink.number).where(
            MagicLink.email == email
        ).where(
            MagicLink.action == action
        )
        result = await db.execute(stmt)
        numbers = result.scalars().all()

        if not numbers:
            key = secrets.token_urlsafe(64)
            await save_magic_link(db, key, email, action, 1)

            to_hash = f'{key}{email}{action}1'
            return create_full_magic_link(
                hashlib.sha256(to_hash.encode('utf-8')).hexdigest(),
                email,
                action
            )
        
        elif numbers[-1] == 1:
            key = secrets.token_urlsafe(64)
            await save_magic_link(db, key, email, action, 2)
            
            to_hash = f'{key}{email}{action}2'
            return create_full_magic_link(
                hashlib.sha256(to_hash.encode('utf-8')).hexdigest(),
                email,
                action
            )

        elif numbers[-1] == 2:
            key = secrets.token_urlsafe(64)
            await save_magic_link(db, key, email, action, 3)
                
            to_hash = f'{key}{email}{action}3'
            return create_full_magic_link(
                hashlib.sha256(to_hash.encode('utf-8')).hexdigest(),
                email,
                action
            )
        
        else:
            stmt = delete(MagicLink).where(
                MagicLink.email == email
                ).where(
                    or_(
                        MagicLink.number == 1,
                        MagicLink.number == 2
                    )
                )
            await db.execute(stmt)
            await db.commit()

            stmt = select(MagicLink.created_at).where(MagicLink.email == email)
            result = await db.execute(stmt)
            created_at = result.scalar_one_or_none()

            if ensure_utc(created_at) + timedelta(   # type: ignore
                    minutes=settings.MAGIC_LINK_TIMEOUT_MINUTES
                ) > datetime.now(timezone.utc):
                return None
            
            else:
                stmt = delete(MagicLink).where(
                    MagicLink.email == email
                ).where(
                    MagicLink.number == 3
                )

                await db.execute(stmt)
                await db.commit()

                key = secrets.token_urlsafe(64)
                await save_magic_link(db, key, email, action, 1)
                
                to_hash = f'{key}{email}{action}1'
                return create_full_magic_link(
                    hashlib.sha256(to_hash.encode('utf-8')).hexdigest(),
                    email,
                    action
                )
    else:
        return None


async def verify_magic_link(
    db: AsyncSession,
    token: str,
    email: str,
    action: int
):
    stmt = select(
        MagicLink.key,
        MagicLink.action,
        MagicLink.number
    ).where(
        MagicLink.email == email
    ).where(
        MagicLink.action == action
    ).order_by(
        MagicLink.id.desc()
    ).limit(1)

    result = await db.execute(stmt)
    data = result.one_or_none()

    if data:
        to_hash = f'{data[0]}{email}{data[1]}{data[2]}'   # type: ignore
        true_token = hashlib.sha256(to_hash.encode('utf-8')).hexdigest()

        if true_token == token:
            # Удаляем magic-link
            stmt = delete(MagicLink).where(
                MagicLink.email == email
            ).where(
                MagicLink.action == action
            )
            
            await db.execute(stmt)
            await db.commit()

            return True
        else:
            return False
    else:
        return False


async def verify_registration(
    db: AsyncSession,
    email: str,
    token: str,
    action: int
):
    if await verify_magic_link(db, token, email, action):
        # Помечаем уч. запись как проверенную
        stmt = update(User).where(
            User.email == email
        ).values(
            verification=1
        )

        await db.execute(stmt)
        await db.commit()

        stmt = select(User.id).where(
            User.email == email
        )

        id_result = await db.execute(stmt)
        id = id_result.scalar_one_or_none()

        return {
            'access_token': create_access_token(id, email),   # type: ignore
            'refresh_token': await create_refresh_token(db, email)
        }
    else:
        raise HTTPException(
            status_code=401,
            detail='Провалена проверка: неправильный или подделанный токен'
        )


async def send_magic_link(
    db: AsyncSession,
    data: SendMagicLink
):
    magic_link = await create_magic_link(
        db=db,
        email=data.email,
        action=data.action
    )

    if magic_link:

    # Тут должна быть SMTP-отправка письма на эл. почту

        if settings.DEBUG:
            return {
                'success': True,
                'magic_link': magic_link
            }
        else:
            return {
                'success': True
            }
    else:
        return {
            'success': False
        }