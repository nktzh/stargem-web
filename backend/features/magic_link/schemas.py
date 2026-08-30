from pydantic import BaseModel, EmailStr


class SendMagicLink(BaseModel):
    email: EmailStr
    action: int