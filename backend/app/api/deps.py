from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.database.mongodb import db
from app.utils.security import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    payload = verify_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token.",
        )

    users_collection = db["users"]

    user = users_collection.find_one(
        {"email": payload["sub"]}
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found.",
        )

    return user