import datetime # 작성 시간 기록을 위한 패키지
from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify, app
import bcrypt as bc # 암호화 패키지
client = MongoClient("mongodb+srv://sparta:test@cluster0.280f8z1.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

app = Flask(__name__)

@app.route('/')#메인페이지
def home():
    return render_template('index.html')





if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)
