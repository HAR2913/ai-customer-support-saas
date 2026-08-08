from fastapi import APIRouter, HTTPException
from app.utils.security import create_access_token
from fastapi import Depends
from app.api.deps import get_current_user

from app.schemas.user_schema import (
    UserRegisterSchema,
    UserLoginSchema,
    UserResponseSchema,
)
from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponseSchema,
    status_code=201,
)
def register(user: UserRegisterSchema):
    try:
        created_user = AuthService.register_user(
            full_name=user.full_name,
            email=user.email,
            password=user.password,
        )

        return {
            "id": created_user["id"],
            "full_name": created_user["full_name"],
            "email": created_user["email"],
            "is_active": created_user["is_active"],
        }

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

@router.post("/login")
def login(user: UserLoginSchema):
    try:
        authenticated_user = AuthService.authenticate_user(
            email=user.email,
            password=user.password,
        )

        access_token = create_access_token(
            authenticated_user["email"]
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user),
):
    return {
        "id": str(current_user["_id"]),
        "full_name": current_user["full_name"],
        "email": current_user["email"],
        "is_active": current_user["is_active"],
    }    