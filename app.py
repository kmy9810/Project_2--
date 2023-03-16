import datetime # 작성 시간 기록을 위한 패키지
from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify, app, session, redirect, url_for, escape
from werkzeug.utils import secure_filename
client = MongoClient("mongodb+srv://sparta:test@cluster0.280f8z1.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta
app = Flask(__name__)
@app.route('/')#메인페이지
def home():
    return render_template('index.html')
#멤버카드 댓글 저장
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
#멤버카드 댓글 불러오기
@app.route('/comment', methods=["GET"])
def show_comment():
    all_comments = list(db.commentbox.find({},{'_id':False}))[::-1]
    return jsonify({'result':all_comments})
# @app.route('/userData/<member>', methods=["GET"])
# def show_member(member):
#     user = member
#     contents = list(db.Users.find({'name':user},{'_id':False}))[::-1]
#     return jsonify({'result':contents, 'msg': '연결완료'})
#지명
#팀소개 댓글 저장
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
#상민
@app.route("/board/<category>", methods=["GET"])
def detail_get(category):
    print(category)
    member_receive = category
    detail_list  = list(db.Users.find({'name':member_receive},{'_id':False}))
    return jsonify({'detail': detail_list})
@app.route('/<name>')
def member(name):
    return render_template('member.html')
@app.route('/detail')  # 메인페이지
def detail():
    return render_template('insertTest.html')
@app.route('/getlist')
def getlist():
    val = request.values
    cmp = val.get('name')
    namelist = list(db.Users.find({'name': cmp}, {'_id': False}))
    return namelist
@app.route("/create", methods=['POST'])
def create():
    name = request.form['name_give']
    try:
        img = request.form['img_give']
    except:
        img = None
    hobby = request.form['hobby_give']
    info_1 = request.form['info_1_give']
    info_2 = request.form['info_2_give']
    info_3 = request.form['info_3_give']
    info_4 = request.form['info_4_give']
    doc = {
        'name': name,
        'img': img,
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