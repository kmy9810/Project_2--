const img_path = "static/img/"
function postData() {
  let formData = new FormData()
    tmp_1 = window.document.querySelector("#file").files
    if (tmp_1[0] != undefined) {
        console.log('a')
        img = tmp_1[0].name
        formData.append('img_give', img)
    }
  name_1 = window.document.getElementById("name_1").value
  formData.append('name_give', name_1)
  hobby = window.document.getElementById("hobby").value
  formData.append('hobby_give', hobby)
  info_1 = window.document.getElementById("info_1").value
  formData.append('info_1_give', info_1)
  info_2 = window.document.getElementById("info_2").value
  formData.append('info_2_give', info_2)
  info_3 = window.document.getElementById("info_3").value
  formData.append('info_3_give', info_3)
  info_4 = window.document.getElementById("info_4").value
  formData.append('info_4_give', info_4)
        $
        .ajax({
            type: 'POST',
            url: '/create',
            data: formData,
            async:false,
            processData: false,
            contentType:false,
            success: function (response) {
              if (response["result"] == 'success') {
                alert(response["msg"])
                if (tmp_1[0] != undefined) {
                    console.log('b')
                  fileUpload()}
                opener.parent.location.reload()
                selfClose()
              }
            },
            error: function (xtr, status, error) {
                alert(xtr + ":" + status + ":" + error);
            }
        });
}
function fileUpload() {
  tmp = window.document.querySelector("#file").files[0]
  console.log(tmp)
  let formData = new FormData()
  formData.append('file', tmp)
  $.ajax({
            type: 'POST',
            url: '/file_upload',
            data: formData,
            async:false,
            processData: false,
            contentType:false,
            enctype:"multipart/form-data",
            success: function (response) {
              if (response["result"] == 'success') {
                alert(response["msg"])
              }
            },
            error: function (xtr, status, error) {
                alert(xtr + ":" + status + ":" + error);
            }
        });
}
/*
  함수명 : getIdData
  인자값 : _id 색인할 id의 value를 인자값으로 받아와 사용.
  반환값 : id의 데이터를 JSON 형태의 데이터로 리턴해준다.
  사용처 : 본문에서 특정 id로 해당 id의 데이터를 찾을때 사용한다.
*/
function getIdData(_name) {
  let result
  console.log(_name)
    $.ajax({
        type: 'GET', url: '/getlist', async: false, //동기 / 비동기.
        data: { 'name': _name },
        success: function (response) {
          console.log("[Response Value] : ", response)
          result = response
        },
        error: function (xtr, status, error) {
            alert(xtr + ":" + status + ":" + error);
        }
    });
  return result
}
/*
  함수명 : openPage
  인자값 : path : 경로이름,
           name : 새로 열릴 창의 이름값,
           x : 새로 열릴창의 가로 크기,
           y : 새로 열릴창의 세로 크기
  반환값 : x
  사용처 : 새로운 창을 열 필요성이 있을때 사용한다.
*/
function openPage(path, name, x, y) {
    window.open(path, name, `width= ${x}, height=${y}`);
}
/*
  함수명 : mainReload
  인자값 : x
  반환값 : x
  사용처 : 자식창에서 데이터의 변경이 있을 시 부모창도 반영시키기 위해 사용한다.
*/
function mainReload() {
    opener
        .document
        .location
        .reload();
}
function selfClose() {
    self.close();
}
function setData(data, setname) {
  window.document.getElementById("name_1").value = setname

  window.document.getElementById("hobby").value = data[0].hobby
  window.document.getElementById("info_1").value = data[0].info_1
  window.document.getElementById("info_2").value = data[0].info_2
  window.document.getElementById("info_3").value = data[0].info_3
  window.document.getElementById("info_4").value = data[0].info_4
}
function datauppand(data) {
  if (data[0]) {
    _name = data[0].name
    _img = img_path + data[0].img
    _hobby = data[0].hobby
    _info_1 = data[0].info_1
    _info_2 = data[0].info_2
    _info_3 = data[0].info_3
    _info_4 = data[0].info_4
    let temp_html = `
    <div class="right_bar">
    <div class="contents">
        <div class="instar_bg">
            <div class="profile">
                <img class="image"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFizDLXYxlzFDLGKFQKZRwdT3DLua58vr56JpQDJ98FzQEU4etUVLlE7gkmCAGaIZyPA&usqp=CAU">
                <div id="instar_name" class="instar_name">
                    ${_name}
                </div>
            </div>
            <div class="img_area">
                <img class="upload_img"
                     src="${_img}">
            </div><hr>
            <div class="extra">
                <button class="buttons">❤</button>
                <button class="buttons">💌</button>
                <div class="detail_btn">
                    <button class="info_btn" onclick="openPage('/detail', 'test', 500, 600)" type="button">상세정보</button>
                </div>
            </div>
            <div class="good">
                좋아요 500개
            </div>
        </div>
    </div>
    <div class="detail_page">
            <div class="teamname">
                <h1>
                    ${_name}
                </h1>
            </div>

            <div id="text_Box" class="teaminfo" style="text-align: left;">
                <h5 class="info_h" style="font-size:30px">${_hobby}</h4>
                <h5 class="info_h" style="font-size:30px">TMI.1 : ${_info_1}</h4>
                <h5 class="info_h" style="font-size:30px">TMI.2 : ${_info_2}</h4>
                <h5 class="info_h" style="font-size:30px">TMI.3 : ${_info_3}</h4>
                <h5 class="info_h" style="font-size:30px">TMI.4 : ${_info_4}</h4>
            </div>
        </div>
    <div>
        <tbody id="comments"></tbody>
    </div>
</div>
<div class="folder_mom">
<div class="folder">
                    <div class="tabs" >
                        <button class="tab active" onclick="openTab(event, 'tab-1')"style="font-family: 'Tenada';">
                            <div>
                                <span>1일차</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-2')"style="font-family: 'Tenada';">
                            <div>
                                <span>2일차</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-3')"style="font-family: 'Tenada';">
                            <div>
                                <span>3일...차</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-4')"style="font-family: 'Tenada';">
                            <div>
                                <span>4..ㅇ..ㅣㄹ..차..</span></div>
                        </button>
                    </div>
                    <div class="content">
                        <div class="content__inner" id="tab-1">
                            <div class="page" style="font-size:30px; font-family: 'Tenada';">
                                <p>묘옹 : 우왕~ 팀플이닷^ㅇ^ 재밌겠다~~<br>
                                    미니미니 : 우와~어색해..^ㅇ^<br>
                                    홍홍 : 내가..뭘 했더라..?<br>
                                    G묘옹 : 여긴..어디..?난..ㄴㄱ?
                                </p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-2">
                            <div class="page" style="font-size:30px; font-family: 'Tenada';">
                                <p>묘옹 : 우..와...재..재밌나..? 그래 재밌어..재밌다구..화이팅...<br>
                                    미니미니 : (기억상실)<br>
                                    홍홍 : 왜..왜 안되냐고..해달란 거 다 해줬잖아..왜그래 나한테..<br>
                                    G묘옹 : 여긴..어디..?난..ㄴㄱ?
                                </p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-3">
                            <div class="page" style="font-size:30px; font-family: 'Tenada';">
                                <p>묘옹 : 이건 아니야.. 무언가 잘못되었어.. 뭐지..?<br>
                                    미니미니 : 집이지만..집에 가고싶어..;_;<br>
                                    홍홍 : (코드 복구중)(코드 복구중)(코드 복구중)(코드 복구중)(코드 복구중)(코드 복구중)(코드 복구중)<br>
                                    G묘옹 : 여긴..어디..?난..ㄴㄱ?
                                </p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-4" style="font-size:30px; font-family: 'Tenada';">
                            <div class="page">
                            <p>살려주세요..살려주세요..살..려..마..감..지킬 수..있지..?..우리..화이..팅..끝나면...맥..주..
                            </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
</div>

  `
    return temp_html
  }
}

function openTab(evt, tab) {
  var i,
      tabcontent,
      tablinks;
  tabcontent = document.getElementsByClassName("content__inner");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i]
          .className
          .replace(" active", "");
  }
  document
      .getElementById(tab)
      .style
      .display = "block";
  evt.currentTarget.className += " active";
}

