import datetime # 작성 시간 기록을 위한 패키지
from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify, app, session, redirect, url_for, escape
from werkzeug.utils import secure_filename
import bcrypt as bc # 암호화 패키지
client = MongoClient('mongodb+srv://sparta:test@cluster0.o2mnh48.mongodb.net/?retryWrites=true&w=majority')
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


# @app.route('/login', methods=["POST"])
# def login():
#     id_receive = request.form['id_give']
#     pw_receive = request.form['pw_give']
#     user = db.Users.find_one({'id': id_receive})
#     print(user)
#     return jsonify({'result': 'success', 'msg': '연결 완료!'})


    # if id_receive == current_id['id'] and current == True:
    #         session['id_give'] = request.form['id_give']   #현정
    #         session['mbti'] = mbti['mbti']
    #         return redirect(url_for('index'))
    # else:
    return jsonify({'msg': '아이디 또는 비밀번호를 확인해 주세요'})

# @app.route('/login')
# def index():
#     if 'id_give' in session:  # session안에 id_give가 있으면 로그인
#         return jsonify({'msg': '어서오세요 %s 님^ㅇ^' %escape(session['id_give'])})
#     return render_template('base.html') #세션 보내버리기


@app.route('/member')
def member():
    return render_template('member.html')

# 박지홍
@app.route('/detail')  # 메인페이지
def detail():
    return render_template('insertTest.html')


@app.route('/getlist')
def getlist():
    val = request.values
    cmp = val.get('name')
    namelist = list(db.Users.find({'name': cmp}, {'_id': False}))
    print("TEST!! : ", namelist)
    return namelist


@app.route("/create", methods=['POST'])
def create():
    name = request.form['name_give']
    img = request.form['img_give']
    comment = request.form['comment_give']
    hobby = request.form['hobby_give']
    info_1 = request.form['info_1_give']
    info_2 = request.form['info_2_give']
    info_3 = request.form['info_3_give']
    info_4 = request.form['info_4_give']
    doc = {
        'name': name,
        'img': img,
        'comment': comment,
        'hobby': hobby,
        'info_1': info_1,
        'info_2': info_2,
        'info_3': info_3,
        'info_4': info_4
    }
    namelist = list(db.Users.find({'name': name}, {'_id': False}))
    if not len(namelist):
        db.Users.insert_one(doc)

    else:
        db.Users.update_one({'name': name}, {"$set": doc})
    return jsonify({'result': 'success', 'msg': '연결 완료!'})


@app.route("/file_upload", methods=['POST'])
def file_upload():
    if request.method == 'POST':

        f = request.files['file']
        print("files? : ", request.files)
        f.save('./static/img/' + secure_filename(f.filename))
        return jsonify({'result': 'success', 'msg': '저장 완료!'})
    else:
        return jsonify({'result': 'fail', 'msg': '저장 실패!'})

if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)
