from datetime import datetime


class UserModel:
    @staticmethod
    def create_user(
        full_name: str,
        email: str,
        hashed_password: str,
    ):
        return {
            "full_name": full_name,
            "email": email.lower(),
            "hashed_password": hashed_password,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }