from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 400

    user = User(email=email, password=generate_password_hash(password), is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"msg": "This is a protected route", "user": user.serialize()}), 200
