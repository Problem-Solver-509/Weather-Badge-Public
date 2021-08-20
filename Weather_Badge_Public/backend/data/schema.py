import sqlite3


def schema(dbpath="accounts.db"):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE accounts(
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(16) UNIQUE NOT NULL,
            email VARCHAR UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            session_id VARCHAR(15),
            favorite_n_lat VARCHAR(25),
            favorite_n_lon VARCHAR(25),
            favorite_w_lat VARCHAR(25),
            favorite_w_lon VARCHAR(25),
            favorite_e_lat VARCHAR(25),
            favorite_e_lon VARCHAR(25),
            favorite_s_lat VARCHAR(25),
            favorite_s_lon VARCHAR(25)
            
        );""")


schema()
