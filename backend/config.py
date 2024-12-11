import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql+psycopg://postgres:Neazeem232@localhost/widya_informasi"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-default-secret-key")  # Use a default or environment variable
    SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")  # Flask's general-purpose secret key
    JWT_ALGORITHM = 'HS256'