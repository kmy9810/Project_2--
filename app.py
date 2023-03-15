import datetime # 작성 시간 기록을 위한 패키지
from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify, app, session, redirect, url_for, escape
import bcrypt as bc # 암호화 패키지
client = MongoClient("mongodb+srv://sparta:test@cluster0.280f8z1.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta

app = Flask(__name__)

@app.route('/')#메인페이지
def home():
    return render_template('index.html')

@app.route('/join')#회원가입 팝업
def join():
    return render_template('join.html')

@app.route('/createUserData', methods=["POST"])
def create_user():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    hashed_pw=bc.hashpw(pw_receive.encode("utf-8"), bc.gensalt()).decode("utf-8")
        #각 입력값이 비어있을 경우 등록 실패
    if db.Users.find_one({'id':id_receive}) != None:
            return jsonify({ 'result': 'fail_00', 'msg': '이미 존재하는 아이디입니다.'})
        #db저장
    else:
        doc = {
            'id' : id_receive,
            'pw' : hashed_pw,
            'name' : '김미영',
            'intro': '안녕하세요',
            'hobby': '핑핑이 밥주기',
            'info_1': '',
            'info_2': '',
            'info_3': '',
            'info_4': '',
        }
        db.Users.insert_one(doc)
    return jsonify({ 'result': 'success', 'msg': '가입 완료!'})

@app.route('/comment/<a>', methods=["POST"])
def save_comment(a):
    user = a
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    
    doc = {
        'id' : user,
        'name' : name_receive,
        'comment' : comment_receive,
        'date' : datetime.datetime.now(),
    }
    db.commentbox.insert_one(doc)
    
    return jsonify({ 'result': 'success', 'msg': '저장완료'})

@app.route('/comment/<a>', methods=["GET"])
def show_comment(a):
    user = a
    all_comments = list(db.commentbox.find({'id':user},{'_id':False}))[::-1]
    
    return jsonify({'result':all_comments})


@app.route('/userData/<member>', methods=["GET"])
def show_member(member):
    user = member
    contents = list(db.Users.find({'name':user},{'_id':False}))[::-1]

    
    return jsonify({'result':contents, 'msg': '연결완료'})


@app.route('/reply', methods=["POST"])
def submit():
    name_receive = request.form['name_give']
    reply_receive = request.form['reply_give']
    
    print(name_receive)

    doc = {
        'name': name_receive,
        'reply': reply_receive
    }
    db.replys.insert_one(doc)

    return jsonify({'result': 'success', 'msg': '저장완료'})




if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)
