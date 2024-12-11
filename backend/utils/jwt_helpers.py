from flask_jwt_extended import create_access_token, get_jwt_identity

def generate_token(user_id):
    return create_access_token(identity=str(user_id))

def get_current_user_id():
    return get_jwt_identity()
