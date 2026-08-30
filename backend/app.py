from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings

from features.auth.routers import router as auth_router
from features.magic_link.routers import router as magic_link_router


def start_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )

    app.include_router(
        auth_router,
        prefix='/auth',
        tags=['Авторизация']
    )

    app.include_router(
        magic_link_router,
        prefix='/verify',
        tags=['Авторизация', 'Верификация']
    )

    return app


app = start_app()