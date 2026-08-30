import jwt
import secrets

from argon2 import PasswordHasher
from argon2.low_level import Type
from argon2.exceptions import VerifyMismatchError
from datetime import datetime, timedelta, timezone
from sqlalchemy import String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession

from .config import settings
from core.database import Base

ph = PasswordHasher(
    time_cost=3,
    memory_cost=65536,
    parallelism=4,
    hash_len=32,
    salt_len=16,
    type=Type.ID
)


class RefreshToken(Base):
    __tablename__ = 'refresh_tokens'

    id: Mapped[int] = mapped_column(primary_key=True)
    token: Mapped[str] = mapped_column(String(), unique=True)
    email: Mapped[str] = mapped_column(String(255), index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )


def hash_password(password: str) -> str:
    hashed_password = ph.hash(password)
    return hashed_password


def verify_password(
    hashed_password: str,
    password: str
) -> bool:
    try:
        ph.verify(hashed_password, password)
        return True
    except VerifyMismatchError:
        return False


def create_access_token(
    id: int,
    email: str
) -> str:
    to_encode = {
        'sub': str(id),
        'email': email,
        'role': 'user',
        'exp': datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        ),
        'iat': datetime.now(timezone.utc)
    }

    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )


async def create_refresh_token(
    db: AsyncSession,
    email: str
) -> str:
    refresh_token = secrets.token_urlsafe(64)

    refresh_token_orm = RefreshToken(
        token=refresh_token,
        email=email
    )

    db.add(refresh_token_orm)
    await db.commit()
    await db.refresh(refresh_token_orm)

    return refresh_token