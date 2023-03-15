/*
  함수명 : postData
  인자값 : x
  반환값 : x
  사용처 : 윈도우 페이지에서 값을 받아와 데이터베이스에 데이터를 넣는 용도.
*/
const img_path = "static/img/"
function postData() {
    tmp = window.document.querySelector("#file").files[0]
    img = tmp.name
    name1 = window.document.getElementById("name").value
    comment = window.document.getElementById("comment").value
    hobby = window.document.getElementById("hobby").value
    info_1 = window.document.getElementById("info_1").value
    info_2 = window.document.getElementById("info_2").value
    info_3 = window.document.getElementById("info_3").value
    info_4 = window.document.getElementById("info_4").value
        $
        .ajax({
            type: 'POST',
            url: '/create',
            data: {
                'name_give': name1,
                'img_give': img,
                'comment_give': comment,
                'hobby_give': hobby,
                'info_1_give': info_1,
                'info_2_give': info_2,
                'info_3_give': info_3,
                'info_4_give': info_4
            },
            success: function (response) {
              if (response["result"] == 'success') {
                alert(response["msg"])
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


function setData(data) {
  window.document.getElementById("name").value = data[0].name,
  window.document.getElementById("img_path").src = img_path+data[0].img,
  console.log("check : ", window.document.getElementById("img_path").src),
  window.document.getElementById("comment").value = data[0].comment,
  window.document.getElementById("hobby").value = data[0].hobby,
  window.document.getElementById("info_1").value = data[0].info_1,
  window.document.getElementById("info_2").value = data[0].info_2,
  window.document.getElementById("info_3").value = data[0].info_3,
  window.document.getElementById("info_4").value = data[0].info_4
}
