from app.database.mongodb import db
from app.models.user_model import UserModel
from app.utils.security import hash_password, verify_password


class AuthService:

    @staticmethod
    def register_user(
        full_name: str,
        email: str,
        password: str,
    ):
        users_collection = db["users"]

        # Check if email already exists
        existing_user = users_collection.find_one(
            {"email": email.lower()}
        )

        if existing_user:
            raise ValueError(
                "Email already registered."
            )

        # Hash password
        hashed_password = hash_password(password)

        # Create user document
        user = UserModel.create_user(
            full_name=full_name,
            email=email,
            hashed_password=hashed_password,
        )

        # Insert into MongoDB
        result = users_collection.insert_one(user)

        user["id"] = str(result.inserted_id)

        return user

    @staticmethod
    def authenticate_user(
        email: str,
        password: str,
    ):
        users_collection = db["users"]

        user = users_collection.find_one(
            {"email": email.lower()}
        )

        if not user:
            raise ValueError("Invalid email or password.")

        password_matches = verify_password(
            password,
            user["hashed_password"],
        )

        if not password_matches:
            raise ValueError("Invalid email or password.")

        return user

   