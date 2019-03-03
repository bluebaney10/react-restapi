#!/usr/bin/env python
import os
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin
import sqlite3


db_connect = create_engine('sqlite:///data/user.db')
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)


@app.route('/')
@cross_origin()
def helloWorld():
  return "Hello, cross-origin-world! jaa"


@app.route('/users',methods=['GET'])
def get():
    conn = db_connect.connect()  # connect to database
    query = conn.execute("select * from users ORDER BY id DESC")
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return jsonify(result)

@app.route('/users/<int:uid>',methods=['GET'])
def getId(uid):
    conn = db_connect.connect()
    query = conn.execute("select * from users where id =%d " % int(uid))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return jsonify(result)


@app.route('/users',methods=['POST'])
def post():
    req_data = request.get_json()
    first_name = req_data['first_name']
    last_name = req_data['last_name']
    email = req_data['email']
    gender = req_data['gender']
    age = req_data['age']

    conn = db_connect.connect()
    query = conn.execute("SELECT id FROM users ORDER BY id DESC LIMIT 0, 1")
    myid = query.fetchone()[0] + 1

    query = conn.execute("insert into users values('{0}','{1}','{2}','{3}', \
                                   '{4}','{5}')".format(myid, first_name, last_name,
                                                        email, gender, age))

    return 'User add success...{} {} {} {} {} {} '.format(first_name, last_name, email, gender, age, myid)


@app.route('/users/update/<int:uid>',methods=['PUT'])
def update(uid):
    req_data = request.get_json()
    first_name = req_data['first_name']
    last_name = req_data['last_name']
    email = req_data['email']
    gender = req_data['gender']
    age = req_data['age']

    conn= db_connect.connect()
    query = conn.execute("""UPDATE users SET first_name = ? ,last_name = ?,\
    email = ?,gender=?,age= ? WHERE id= ? """,(first_name, last_name, email,gender, age, uid))

    return 'update ...{} {} {} {} {} {} success!!!'.format(uid,first_name,last_name,email,gender,age)


@app.route('/users/delete/<int:uid>',methods=['DELETE'])
def delete(uid):
    conn= db_connect.connect()
    query = conn.execute("""DELETE FROM users WHERE id=?""",(uid))
    return 'delete ...{} success!!! '.format(uid)



if __name__ == '__main__':
   port = int(os.environ.get("PORT", 5000))
   app.run(debug=True, port=port)

