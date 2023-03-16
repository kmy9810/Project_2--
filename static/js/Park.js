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

            <div id="text_Box" class="teaminfo">
                <h5 class="info_h">hobby : ${_hobby}</h4>
                <h5 class="info_h">TMI.1 : ${_info_1}</h4>
                <h5 class="info_h">TMI.2 : ${_info_2}</h4>
                <h5 class="info_h">TMI.3 : ${_info_3}</h4>
                <h5 class="info_h">TMI.4 : ${_info_4}</h4>
            </div>
        </div>
    <div>
        <tbody id="comments"></tbody>
    </div>
</div>
<div class="folder_mom">
<div class="folder">
                    <div class="tabs">
                        <button class="tab active" onclick="openTab(event, 'tab-1')">
                            <div>
                                <span>Work stuff</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-2')">
                            <div>
                                <span>Food</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-3')">
                            <div>
                                <span>Baking</span></div>
                        </button>
                        <button class="tab" onclick="openTab(event, 'tab-4')">
                            <div>
                                <span>Cat</span></div>
                        </button>
                    </div>
                    <div class="content">
                        <div class="content__inner" id="tab-1">
                            <div class="page">
                                <p>Productize. Optics accountable talk. Thought shower. High performance
                                    keywords market-facing drink from the firehose, or you better eat a reality
                                    sandwich before you walk back in that boardroom, but accountable talk knowledge
                                    process outsourcing.
                                </p>
                                <p>What's our go to market strategy? cross functional teams enable out of the
                                    box brainstorming nor zeitgeist viral engagement. Deep dive. Organic growth
                                    quick sync, feed the algorithm.
                                </p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-2">
                            <div class="page">
                                <p>I love cheese, especially the big cheese gouda. Monterey jack red leicester
                                    roquefort cheese and wine fromage frais smelly cheese melted cheese dolcelatte.
                                    Fromage smelly cheese manchego paneer cheese and wine danish fontina macaroni
                                    cheese red leicester.
                                </p>
                                <p>Stilton fondue queso emmental when the cheese comes out everybody's happy
                                    croque monsieur queso paneer. Say cheese pecorino swiss boursin halloumi cottage
                                    cheese taleggio boursin.
                                </p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-3">
                            <div class="page">
                                <p>Cupcake ipsum dolor sit amet jujubes tart. Tiramisu icing gingerbread halvah
                                    cake. Marzipan cake soufflé cookie brownie ice cream cupcake. Dragée croissant
                                    bonbon ice cream oat cake jelly cookie. Wafer candy dessert jelly jelly-o.
                                </p>
                                <p>Oat cake donut powder pastry wafer brownie cupcake caramels bear claw. Bonbon
                                    caramels oat cake cake shortbread. Cake cheesecake candy icing bear claw
                                    marshmallow icing jelly. Halvah biscuit pudding danish cookie bonbon gummies.</p>
                            </div>
                        </div>
                        <div class="content__inner" id="tab-4">
                            <div class="page">
                                <p>Miaow then turn around and show you my bum flee in terror at cucumber
                                    discovered on floor. Terrorize the hundred-and-twenty-pound rottweiler and steal
                                    his bed, not sorry sleep on dog bed, force dog to sleep on floor and grab pompom
                                    in mouth and put in water dish cats are fats i like to pets them they like to
                                    meow back present belly, scratch hand when stroked.
                                </p>
                                <p>Bleghbleghvomit my furball really tie the room together love
                                    asdflkjaertvlkjasntvkjn (sits on keyboard) but bawl under human beds.</p>
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

// Horizontal scroll for the tabs on mousewheel. If tabs are longer than the
// content section, there's a scroll bar but it's hidden to retain the design.
if (window.innerWidth > 800) {
  const scrollContainer = document.querySelector(".tabs");

  scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
  });
}
