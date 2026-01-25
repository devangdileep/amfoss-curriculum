from flask import *
from flask_cors import CORS
import mysql.connector as ms
import bcrypt

app = Flask(__name__)
CORS(app)

mydb = ms.connect(host = "localhost",
                user = "root",
                passwd = "Devang@6282",
                database = 'devang')
cur = mydb.cursor()

cur.execute("show tables;")
tables_data = cur.fetchall()

table_exist = False
user_playlist_table_exist = False
user_playlist_song_table_exist = False
for i in tables_data:
    if "USER_AUTH" in i[0]:
        table_exist = True
for i in tables_data:
    if "USER_PLAYLISTS" in i[0]:
        user_playlist_table_exist = True
for i in tables_data:
    if "USER_PLAYLIST_SONG" in i[0]:
        user_playlist_song_table_exist = True

if table_exist:
    print("Table Already Exist !")
else:    
    table_ini = "create table USER_AUTH (id integer primary key, user_id varchar(255),user_email varchar(255), hashed_password varchar(255));"
    cur.execute(table_ini)
    print("Table Created Sucessfully")

if user_playlist_table_exist:
    print("Table Already Exist !")
else:
    table_ini = "create table USER_PLAYLISTS (id int not null AUTO_INCREMENT primary key, username varchar(255), playlist_name varchar(255));"
    cur.execute(table_ini)
    print("Playlist Table Created Sucessfully")

if user_playlist_song_table_exist:
    print("Table Already Exist !")
else:
    table_ini = "create table USER_PLAYLIST_SONG (id int(11) not null auto_increment primary key, username varchar(255) default null, playlist_name varchar(255) default null, song_title varchar(255) default null, song_artist varchar(255) default null, song_audio varchar(500) default null, song_cover varchar(500) default null);"
    cur.execute(table_ini)
    print("Playlist Song table created sucessfully !")


@app.route('/auth/login', methods=['POST' , 'GET'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    auth_table_query = 'select user_id, hashed_password from USER_AUTH where user_id = %s;'
    cur.execute(auth_table_query, (username,))
    user_exist = cur.fetchone()

    if not user_exist:
        return jsonify({
            "status": "error",
            "message": "User Not Found"
        }), 401
    db_username, password_hash = user_exist
    if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
        return jsonify({
            "status": "success",
            "message": "Login successful"
        }), 200
    return jsonify({
        "status": "error",
        "message": "Invalid username or password"
    }), 401

@app.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({
            "status": "error", 
            "message": "Missing fields"}), 400
    
    check_query = "SELECT id FROM USER_AUTH WHERE user_id = %s OR user_email = %s"
    cur.execute(check_query, (username, email))
    existing_user = cur.fetchone()

    if existing_user:
        return jsonify({
            "status": "error",
            "message": "Username or Email already exists"
        }), 400

    try:
        cur.execute("select * from USER_AUTH;")
        def_id = cur.fetchall()
        regitser_id = len(def_id) + 1
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(12))
        insert_query = "INSERT INTO USER_AUTH (id,user_id, user_email, hashed_password) VALUES (%s , %s, %s, %s)"
        cur.execute(insert_query, (regitser_id,username, email, hashed_password))
        mydb.commit()

        return jsonify({
            "status": "success",
            "message": "User registered successfully"
        }), 201

    except Exception as e:
        mydb.rollback()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/playlists/<username>', methods=['GET'])
def get_playlists(username):
    try:
        query = "select id, playlist_name FROM USER_PLAYLISTS where username = %s"
        cur.execute(query, (username,))
        data = cur.fetchall()
        playlists = []
        for row in data:
            playlists.append({
                "id": row[0],
                "playlist_name": row[1]
            })
        return jsonify(playlists), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/playlists/create', methods=['POST'])
def create_playlist():
    data = request.json
    username = data.get('username')
    playlist_name = data.get('playlist_name')
    if not username or not playlist_name:
        return jsonify({"error": "Missing fields"}), 400
    try:
        insert_query = "insert into USER_PLAYLISTS (username, playlist_name) values (%s, %s)"
        cur.execute(insert_query, (username, playlist_name))
        mydb.commit()
        return jsonify({"message": "Playlist created"}), 201
    except Exception as e:
        mydb.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/playlists/addsong', methods=['POST'])
def add_song_to_playlist():
    data = request.json
    username = data.get('username')
    playlist = data.get('playlist_name')
    title = data.get('title')
    artist = data.get('artist')
    audio = data.get('audio')
    query = "insert into USER_PLAYLIST_SONG (username, playlist_name, song_title, song_artist, song_audio, song_cover) values (%s,%s,%s,%s,%s,%s)"
    cur.execute(query,(username,playlist,title,artist,audio,data.get('cover')))
    mydb.commit()
    return jsonify({"message":"Song added"}), 200

@app.route('/playlists/songs/<username>/<playlist>', methods=['GET'])
def get_playlist_songs(username, playlist):
    query = "select song_title, song_artist, song_audio, song_cover from USER_PLAYLIST_SONG where username=%s AND playlist_name=%s"
    cur.execute(query, (username, playlist))
    data = cur.fetchall()
    songs = []
    for row in data:
        songs.append({
            "title": row[0],
            "artist": row[1],
            "audio": row[2],
            "cover": row[3]
            })
    return jsonify(songs), 200

if __name__ == "__main__":
    app.run(debug=True)
