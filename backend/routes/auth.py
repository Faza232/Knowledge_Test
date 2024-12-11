from flask import Blueprint, request, jsonify
from app import db
from models import User
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    # Validate input
    required_fields = ["name", "email", "password", "gender"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"'{field}' is required"}), 400

    # Check if the email already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create a new user
    user = User(name=data["name"], email=data["email"], gender=data["gender"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validasi user
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid email or password"}), 401

    # Set waktu kedaluwarsa token menjadi 1 jam
    expires = timedelta(hours=1)

    # Buat JWT access token dengan waktu kedaluwarsa 1 jam
    access_token = create_access_token(identity=str(user.id), expires_delta=expires)

    return jsonify(access_token=access_token), 200
