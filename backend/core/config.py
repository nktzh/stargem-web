from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra='ignore'
    )

    APP_NAME: str = 'Stargem'

    HOST: str
    PORT: int
    DEBUG: bool = True

    SECRET_KEY: str
    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    MAGIC_LINK_TIMEOUT_MINUTES: int

    CORS_ORIGINS: list[str] = ['http://localhost:3000']

    DATABASE_URL: str
    DATABASE_POOL_SIZE: int = 10
    DATABASE_MAX_OVERFLOW: int = 20


@lru_cache
def get_settings() -> Settings:
    return Settings()   # type: ignore[call-arg]


settings = get_settings()