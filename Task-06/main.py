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
for i in tables_data:
    if "USER_AUTH" in i[0]:
        table_exist = True

if table_exist:
    print("Table Already Exist !")
else:    
    table_ini = "create table USER_AUTH (id integer primary key, user_id varchar(255),user_email varchar(255), hashed_password varchar(255));"
    cur.execute(table_ini)
    print("Table Created Sucessfully")



@app.route('/auth/login', methods=['POST' , 'GET'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    auth_table_query = 'select * from USER_AUTH;'
    cur.execute(auth_table_query)
    auth_table_data = cur.fetchall()

    for i in auth_table_data:
        if username.lower() == i[1] and bcrypt.checkpw(password.encode('utf-8'),i[3].encode('utf-8')):
            user_Found_Auth = True
            return jsonify({
            "status": "success",
            "message": "Login successful!"
        }), 200

        elif username.lower() == i[1] or bcrypt.checkpw(password.encode('utf-8'),i[3].encode('utf-8')):
            return jsonify({
                "status": "error",
                "message": "Invalid username or password"
            }), 401
        else:
            return jsonify({
                "status": "error",
                "message": "User Does Not Exist"
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


if __name__ == "__main__":
    app.run(debug=True)
