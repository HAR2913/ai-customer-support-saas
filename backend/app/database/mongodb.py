from pymongo import MongoClient
from app.core.config import settings

# Create a MongoDB client
client = MongoClient(settings.MONGODB_URI)

# Get the database
db = client[settings.DATABASE_NAME]

# Collections
users_collection = db["users"]
documents_collection = db["documents"]