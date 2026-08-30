from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db

from .services import verify_registration, send_magic_link
from .schemas import SendMagicLink

router = APIRouter()


@router.get(
    '/',
    status_code=status.HTTP_200_OK
)
async def verify(
        token: str,
        email: str,
        action: int,
        db: AsyncSession = Depends(get_db)
    ):
    if token and email and action:
        if action == 1:
            return await verify_registration(db, email, token, action)
        else:
            raise HTTPException(
                status_code=400,
                detail='Неправильный запрос'
            )
    else:
        raise HTTPException(
            status_code=400,
            detail='Неправильный запрос'
        )


@router.post(
    '/send',
    status_code=status.HTTP_200_OK
)
async def send(
    data: SendMagicLink,
    db: AsyncSession = Depends(get_db)
):
    return await send_magic_link(db, data)