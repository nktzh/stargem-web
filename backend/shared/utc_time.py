from datetime import datetime, timezone


def ensure_utc(dt: datetime) -> datetime:
    '''
    Функция обезопасит формат datetime (UTC)
    '''
    return dt if dt.tzinfo is not None else dt.replace(tzinfo=timezone.utc)