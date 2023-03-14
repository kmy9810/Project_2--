var state = [0,0,0] // 각 입력 박스들의 열림/닫힘 상태

$(document).ready(function () {
    hide_box();
    show_comment()
});

function save_comment() {
        let name = $('#name').val()
        let comment = $('#comment').val()
        let a = $('#me').text()
        if (comment.trim() =='' || name.trim()==''){
            alert("내용과 작성자이름을 입력해주세요")
            return ;
        }
        $.ajax({
            type: "POST",
            url: "/comment/"+a,
            data: {name_give: name,
                    comment_give: comment,
                    },
            success: function (response) {
                if (response["msg"]=='저장완료'){
                    alert(response["msg"])
                    window.location.reload()
                } else {
                    alert(response["msg"])
                }
                
            }
        });
    
}

function open_box(){
    if (state[0]==0){
        $('#comment_box').show()
        state[0]=1
    }
    else{
        $('#comment_box').hide()
        state[0]=0
    }
}

function hide_box(){
    $('#comment_box').hide()
}



function show_comment() {
    let a = $('#me').text()
    $.ajax({
        type: "GET",
        url: "/comment/"+a,
        data: {},
        success: function (response) {
            
            let rows = response['result']

            console.log(rows)
            for (let i = 0; i < rows.length; i++) {
                let name = rows[i]['name']
                let comment = rows[i]['comment']
                let date = rows[i]['date']

                let year = new Date(date).getFullYear().toString()
                let month = new Date(date).getUTCMonth() + 1
                let day = new Date(date).getUTCDate()
                let strdate = `${year}.${month}.${day}`

                let temp_html = `
                                    <div style="margin-bottom:60px; margin-top:30px; list-style:none;">
                                    <h2>${comment}</h2><br>
                                    <h5 style="text-align:right;">${name}(${strdate})</h5>
                                    `
                


                $('#all_comments').append(temp_html)
                
            }
            
        }
    });
}
