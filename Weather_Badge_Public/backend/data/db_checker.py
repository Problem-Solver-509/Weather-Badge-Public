import sqlite3


def checker(dbpath="accounts.db"):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()

        cursor.execute(""" SELECT * FROM accounts """)
        data = cursor.fetchall()

        print('trying')

        for row in data:
            print(row)


checker()

# pk INTEGER PRIMARY KEY AUTOINCREMENT,  0
# username VARCHAR(16) UNIQUE NOT NULL,  1
# email VARCHAR UNIQUE NOT NULL,         2
# password VARCHAR NOT NULL,             3
# session_id VARCHAR(15)                 4

# (self, username, password_hash, session_id, email, pk=None)
