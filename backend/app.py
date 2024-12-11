from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS  # Import Flask-CORS
from config import Config

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Enable CORS for the application
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Register blueprints
    from routes.auth import auth_bp
    from routes.product import product_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(product_bp, url_prefix="/products")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
