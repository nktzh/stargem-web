from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    comfirmedPassword: str


class Login(BaseModel):
    email: EmailStr
    password: str