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


# @app.route('/createUserData', methods=["POST"])
# def create_user():
#     id_receive = request.form['id_give']
#     pw_receive = request.form['pw_give']

#     hashed_pw=bc.hashpw(pw_receive.encode("utf-8"), bc.gensalt()).decode("utf-8")
#         #각 입력값이 비어있을 경우 등록 실패
#         if db.Users.find_one({'id':id_receive}) != None:
#             return jsonify({ 'result': 'fail_00', 'msg': '이미 존재하는 조이름입니다.'})
#         #db저장
#         doc = {
#             'id' : id_receive,
#             'pw' : hashed_pw
#         }
#         db.teamDB.insert_one(doc)
#         return jsonify({ 'result': 'success', 'msg': '조가 생성되었습니다.'})

# @app.route('/login', methods=["GET"])
# def login():
#     id_receive = request.form['id_give']
#     pw_receive=request.form['pw_give']
#     #존재하지 않는 ID(닉네임), ID불일치 확인
#     if not list(db.Users.find({'id':id_receive},{})):
#         return jsonify({ 'result': 'fail', 'msg': '옳지않은 ID 혹은 PW입니다.'})
    
#     user = db.teamDB.find_one({'id':id_receive})
#     if user == None:
#         return jsonify({ 'result': 'fail', 'msg': '옳지않은 ID 혹은 PW입니다.'})
#     #데이터 가져오고, 비밀번호 비교
#     hashed_pw= user['pw']
#     check_pw= bc.checkpw(id_receive.encode("utf-8"),hashed_pw.encode("utf-8"))
#     if not check_pw:
#         return jsonify({ 'result': 'fail', 'msg': '옳지않은 ID 혹은 PW입니다.'})
#     #로그인 완료
#     if id_receive == user['id'] and check_pw == True:
#             session['id_give'] = request.form['id_give'] 
#             return redirect(url_for('index'))
        
#     return  jsonify({ 'result': 'success', 'msg': '로그인 되었습니다.'})

# @app.route('/login')
# def index():
#     if 'id_give' in session:  # session안에 id_give가 있으면 로그인
#         return jsonify({'msg': '어서오세요 %s 님^ㅇ^' %escape(session['id_give'])})
#     return render_template('index.html') #세션 보내버리기



if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)
