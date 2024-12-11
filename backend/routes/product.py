from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Product, User

product_bp = Blueprint("product", __name__)

@product_bp.route('', methods=['OPTIONS'])
@product_bp.route('/<int:product_id>', methods=['OPTIONS'])
def preflight_options(product_id=None):
    response = jsonify({'message': 'Preflight options successful'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    return response

@product_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    data = request.get_json()

    # Validasi data yang diterima
    if not data.get('name') or not data.get('price'):
        return jsonify({'message': 'Name and price are required'}), 422

    try:
        price = float(data['price'])
    except ValueError:
        return jsonify({'message': 'Price must be a number'}), 422

    new_product = Product(
        name=data['name'],
        description=data.get('description', ''),  # Default ke string kosong
        price=price,
        user_id=get_jwt_identity(),
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product created successfully'}), 201


@product_bp.route('/', methods=['GET'])
@jwt_required()
def get_products():
    try:
        # Konversi user_id dari JWT menjadi integer
        user_id = int(get_jwt_identity())
    except ValueError:
        return jsonify({"error": "Invalid user ID in token"}), 400

    # Query produk berdasarkan user_id
    try:
        products = Product.query.all()
        if not products:
            return jsonify({"message": "No products found"}), 404

        # Format data untuk response
        result = [
            {
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "user_id": product.user_id
            }
            for product in products
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@product_bp.route('/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product(product_id):
    try:
        # Konversi user_id dari JWT menjadi integer
        user_id = int(get_jwt_identity())
    except ValueError:
        return jsonify({"error": "Invalid user ID in token"}), 400

    # Query produk berdasarkan product_id dan user_id
    try:
        product = Product.query.filter_by(id=product_id).first()

        if not product:
            return jsonify({"error": "Product not found or not authorized"}), 404

        # Format data untuk response
        result = {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "user_id": product.user_id
        }

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    data = request.get_json()

    # Ambil user_id dari JWT dan cast ke integer
    try:
        user_id = int(get_jwt_identity())
    except ValueError:
        return jsonify({"error": "Invalid user ID in token"}), 400

    # Query untuk mencari produk berdasarkan id dan user_id
    product = Product.query.filter_by(id=product_id, user_id=user_id).first()

    if not product:
        return jsonify({"error": "Product not found or not authorized"}), 404

    # Update data produk
    if 'name' in data:
        product.name = data['name']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = data['price']

    try:
        db.session.commit()
        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        # Konversi user_id dari JWT menjadi integer
        user_id = int(get_jwt_identity())
    except ValueError:
        return jsonify({"error": "Invalid user ID in token"}), 400

    # Cari produk berdasarkan product_id dan user_id
    product = Product.query.filter_by(id=product_id, user_id=user_id).first()

    if not product:
        return jsonify({"error": "Product not found or not authorized"}), 404

    # Hapus produk
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

