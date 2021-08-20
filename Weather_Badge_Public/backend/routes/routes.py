from flask import Flask, jsonify, request
from flask_cors import CORS
from Weather_Badge_Public.backend.models import Account
from Weather_Badge_Public.backend.models import Weather



app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def home():

    origin = Weather.Weather()
    origin.locator()
    origin_dict = origin.get_weather()
    return jsonify(origin_dict)


@app.route('/change_origin', methods=['POST'])
def change_origin():
    data = request.get_json()
    print(data)
    if data.get('latitude'):
        origin = {'lat': data['latitude'], 'lon': data['longitude']}
    else:
        origin = {'lat': data['lat'], 'lon': data['lon']}
    # print({'lat': data['lat'], 'lon': data['lon']})
    instance = Weather.Weather(origin['lat'], origin['lon'])
    origin_dict = instance.get_weather()
    return jsonify(origin_dict)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password1 = data.get("password")
    password = Account.Account.hash_password(password1)
    print(username, password, password1)
    session_id = Account.Account.random_session_id()

    # username, session_id = Account.Account.login(username, password)
    user_data = Account.Account.login(username, password)
    print(user_data)
    if user_data:

        return jsonify(user_data)
    return jsonify({"session_id": None,
                    "username": ""})


@app.route("/api/create-user", methods=["POST"])
def create_user():
    temp_dict = request.get_json()
    password = temp_dict.get('password')
    name = temp_dict.get('username')
    email = temp_dict.get('email')
    password = Account.Account.hash_password(password)
    session_id = Account.Account.random_session_id()
    beleza = Account.Account(name, password, session_id, email)
    beleza.insert()
    beleza.update()

    return jsonify(Account.Account.login(beleza.username, beleza.password_hash))


@app.route("/api/favorite_n", methods=["POST"])
def set_favorite_n():
    data = request.get_json()
    north_lat = data['favorite_n_lat']
    north_lon = data['favorite_n_lon']
    location = {'lat': north_lat, 'lon': north_lon}
    session_id = data['session_id']
    print(session_id, north_lat, north_lon)
    Account.Account.set_favorite_n(location, session_id)
    return 'no'


@app.route("/api/favorite_w", methods=["POST"])
def set_favorite_w():
    data = request.get_json()
    location = data.location
    username = data.username
    Account.Account.set_favorite_n(location, username)


@app.route("/api/favorite_e", methods=["POST"])
def set_favorite_e():
    data = request.get_json()
    location = data.location
    username = data.username
    Account.Account.set_favorite_n(location, username)


@app.route("/api/favorite_s", methods=["POST"])
def set_favorite_s():
    data = request.get_json()
    session_id = data['session_id']
    location = data['location']
    Account.Account.set_favorite_s(location, session_id)


if __name__ == "__main__":
    app.run(debug=True)
