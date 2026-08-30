from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db

from .schemas import UserCreate, Login
from .services import create_user, authorize

router = APIRouter()


@router.post(
    '/registration',
    status_code=status.HTTP_201_CREATED
)
async def registration(
    data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    return await create_user(db, data)


@router.post(
    '/login',
    status_code=status.HTTP_200_OK
)
async def login(
    data: Login,
    db: AsyncSession = Depends(get_db)
):
    return await authorize(db, data)