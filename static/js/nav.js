

function login() {
        let id = $('#id').val()
        let pw = $('#pw').val()

        if (id =='' || pw==''){
            alert("아이디와 비밀번호를 모두 입력해주세요")
        }else{
            $.ajax({
                type: "POST",
                url: "/login",
                data: {'id_give': id, 'pw_give': pw},
                success: function (response) {
                    console.log(response)
                    alert(response["msg"])
                }
            });
        }
    }

    function join() {
        let id = window.document.getElementById("id").value
        let pw = window.document.getElementById("pw").value
        console.log(id)
        if (id =='' || pw==''){
            alert("아이디와 비밀번호를 모두 입력해주세요")
        }else{
            $.ajax({
                type: "POST",
                url: "/createUserData",
                data: {'id_give': id, 'pw_give': pw},
                success: function (response) {
                    if(response["result"]=='success'){
                        alert(response["msg"])
                    window.close
                    }
                    else{
                        alert(response["msg"])
                    }
                }
            });
        }
    }


function member(a) {
    $('#test').empty()
    let member = $(a).val();
    console.log(member)

    $.ajax({
        type: "GET",
        url: "/userData/"+member,
        data: {},
        success: function (response) {

            alert(response["msg"])

            let rows = response['result']
            let intro = rows[0]['intro']
            let name = rows[0]['name']
            let hobby = rows[0]['hobby']
            let info_1 = rows[0]['info_1']
            let info_2 = rows[0]['info_2']
            let info_3 = rows[0]['info_3']
            let info_4 = rows[0]['info_4']

            let temp_html = `<h2>이름 : ${name} 취미 : ${hobby} info:${info_1} ${info_2} ${info_3} ${info_4}</h2>`

            $('#test').append(temp_html)
        }
    });

}



