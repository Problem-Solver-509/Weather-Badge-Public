import sqlite3
from hashlib import sha256
import random


# pk INTEGER PRIMARY KEY AUTOINCREMENT,  4
# username VARCHAR(16) UNIQUE NOT NULL,  0
# email VARCHAR UNIQUE NOT NULL,         3
# password VARCHAR NOT NULL,             1
# session_id VARCHAR(15)                 2


class Account:
    dbpath = "../data/accounts.db"

    def __init__(self, username, password_hash, session_id, email, pk=None, north_lat=40.785091, north_lon=-73.968285,
                 west_lat=50.625398, west_lon=-3.395719, east_lat=48.1790444, east_lon=0.6785594, south_lat=-15.826363,
                 south_lon=-47.920704):
        self.username = username
        self.password_hash = password_hash
        self.session_id = session_id
        self.email = email
        self.pk = pk
        self.north_lat = north_lat
        self.north_lon = north_lon
        self.west_lat = west_lat
        self.west_lon = west_lon
        self.east_lat = east_lat
        self.east_lon = east_lon
        self.south_lat = south_lat
        self.south_lon = south_lon

    def select(self):
        try:
            with sqlite3.connect(self.dbpath) as conn:  # row_factory
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT * from accounts
                """)
                return cursor.fetchall()  # fetchone(thing)  fetchmany(thing1, thing2)
        except sqlite3.Error as error:
            print(f'SELECT failed. Error is {error}')

    def insert(self):
        """Add a new account to our SQL database
        """

        try:
            with sqlite3.connect(self.dbpath) as conn:  # update the INSERT sql call to include all data
                cursor = conn.cursor()
                cursor.execute(
                    """
                    INSERT INTO accounts 
                    (username, password, email, favorite_n_lat, favorite_n_lon, favorite_w_lat, favorite_w_lon, 
                    favorite_e_lat, favorite_e_lon, favorite_s_lat, favorite_s_lon) 
                    VALUES (:username, :password, :email, :north_lat, :north_lon, :west_lat, :west_lon, :east_lat, 
                    :east_lon, :south_lat, :south_lon) 
                    """,
                    {'username': self.username, 'password': self.password_hash, 'email': self.email,
                     'north_lat': self.north_lat, 'north_lon': self.north_lon, 'west_lat': self.west_lat,
                     'west_lon': self.west_lon, 'east_lat': self.east_lat, 'east_lon': self.east_lat,
                     'south_lat': self.south_lat, 'south_lon': self.south_lon}
                )
        except sqlite3.Error as error:  # handle password
            print(f'INSERT failed. Error is ==> {error}')

    def update(self):
        try:
            with sqlite3.connect(self.dbpath) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    UPDATE accounts
                    SET session_id = :session_id
                    WHERE username = :username
                    """,
                    {'username': self.username, "session_id": self.session_id}
                )
        except sqlite3.Error as error:
            print(f'Error is {error}')

    @classmethod
    def login(cls, username, password):

        try:
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    """
                    SELECT * from accounts
                    WHERE username = :username AND password = :password
                    """,
                    {"username": username, "password": password}
                )

            cursor_dict = cursor.fetchone()  # [(1, 2, 3, 4, 5)]
            if not cursor_dict:
                return None, None
            lint = cls(cursor_dict[1], cursor_dict[3], cursor_dict[4], cursor_dict[2], cursor_dict[0])
            the_id = lint.random_session_id()
            lint.session_id = the_id
            lint.update()
            out_dict = {'username': lint.username, 'session_id': lint.session_id, 'north_lat': lint.north_lat,
                        'north_lon': lint.north_lon, 'west_lat': lint.west_lat, 'west_lon': lint.west_lon,
                        'east_lat': lint.east_lat, 'east_lon': lint.east_lon, 'south_lat': lint.south_lat,
                        'south_lon': lint.south_lon}
            return out_dict

        except sqlite3.Error as error:
            print(f'Error is {error}')

    @classmethod
    def token_authenticate(cls, session_id):
        try:
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM accounts WHERE session_id=?"""
                cursor.execute(sql, (session_id,))
                cursor_dict = cursor.fetchone()
                return cls(cursor_dict[1], cursor_dict[3], cursor_dict[4], cursor_dict[2], cursor_dict[0])



        except sqlite3.Error as error:
            print(f'Token_Authenticate error. Error is {error}')

    @staticmethod
    def set_favorite_n(location, session_id):
        try:
            with sqlite3.connect("../data/accounts.db") as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE accounts 
                    SET favorite_n_lat = :location_lat,
                    favorite_n_lon = :location_lon
                    WHERE session_id = :session_id
                    """,
                               {'session_id': session_id, 'location_lat': location['lat'], "location_lon": location['lon']}
                               )
        except sqlite3.Error as error:
            print(f'Update north favorite error. Error is {error}')

    @staticmethod
    def set_favorite_w(location, username):
        try:
            with sqlite3.connect("../data/accounts.db") as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE accounts 
                    SET favorite_w_lat = :location_lat,
                    favorite_w_lon = :location_lon
                    WHERE username = :username
                    """,
                               {'username': username, 'location_lat': location.lat, "location_lon": location.lon}
                               )
        except sqlite3.Error as error:
            print(f'Update north favorite error. Error is {error}')

    @staticmethod
    def set_favorite_e(location, username):
        try:
            with sqlite3.connect("../data/accounts.db") as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE accounts 
                    SET favorite_e_lat = :location_lat,
                    favorite_e_lon = :location_lon
                    WHERE username = :username
                    """,
                               {'username': username, 'location_lat': location.lat, "location_lon": location.lon}
                               )
        except sqlite3.Error as error:
            print(f'Update north favorite error. Error is {error}')

    @staticmethod
    def set_favorite_s(location, session_id):
        try:
            with sqlite3.connect("../data/accounts.db") as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    UPDATE accounts 
                    SET favorite_s_lat = :location_lat,
                    favorite_s_lon = :location_lon
                    WHERE session_id = :session_id
                    """,
                               {'session_id': session_id, 'location_lat': location['lat'],
                                "location_lon": location['lon']}
                               )
        except sqlite3.Error as error:
            print(f'Update north favorite error. Error is {error}')


    @staticmethod
    def hash_password(password):
        # hash a password to obtain SHA256 hash of a given string value
        hasher = sha256()
        hasher.update(password.encode())
        return hasher.hexdigest()


    @staticmethod
    def random_session_id(length=15):
        random_string = "".join([str(random.randint(1, 10)) for _ in range(length)])
        hasher = sha256()
        hasher.update(random_string.encode())
        return hasher.hexdigest()

