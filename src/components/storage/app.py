from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://avnadmin:AVNS_Zr7qiHJKoRrWXLz7RxF@authjwtreact-felipe-d067.e.aivencloud.com:21737/defaultdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZGIiLCJuYW1lIjoiRmVsaXBlIiwiaWF0IjoxMjM0NTY1NDMyMTB9.BIYRWyqIAC9GadJN_3dubpnPPiOns91td08_kAWmVxs'
cors = CORS(app)
db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user= data.get('user')
    password = data.get('password')

    if User.query.filter_by(user=user).first():
        return jsonify({"message": "User already exists on our database."}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(user=user, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = data.get('user')
    password = data.get('password')

    user_db = User.query.filter_by(user=user).first()

    if not user_db or not bcrypt.check_password_hash(user_db.password, password):
        return jsonify({"message": "Wrong user or password."}), 401

    access_token = create_access_token(identity=user_db.user)
    return jsonify(access_token=access_token), 200

    

app.run(host='0.0.0.0', port=8787)