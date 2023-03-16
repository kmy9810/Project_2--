const img_path = "static/img/"
function postData() {
  let formData = new FormData()
  tmp_1 = window.document.querySelector("#file").files
  if (tmp_1 != undefined) {
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
            processData: false,
            contentType:false,
            success: function (response) {
              if (response["result"] == 'success') {
                alert(response["msg"])
                if (tmp_1 != undefined)
                  fileUpload()
                opener.parent.location.reload()
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
            async:true,
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
  if (data[0].img) {
    window.document.getElementById("img_path").src = img_path + data[0].img
    console.log(img_path + data[0].img)
  }
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
  <h2 id="me">${_name}</h2>
  <div id="testData">
      <label>이미지 테스트</label>
      <img src="${_img}" id="img_path" />
  </div>
  <div>
      <label>취미 테스트</label>
      <div id="hobby">${_hobby}</div>
  </div>
  <div>
      <label>TMI 테스트</label>
      <div id="info_1">${_info_1}</div>
  </div>
  <div>
      <label>TMI 테스트</label>
      <div id="info_2">${_info_2}</div>
  </div>
  <div>
      <label>TMI 테스트</label>
      <div id="info_3">${_info_3}</div>
  </div>
  <div>
      <label>TMI 테스트</label>
      <div id="info_4">${_info_4}</div>
  <div>
  `
    return temp_html
  }
}