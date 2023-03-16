function submit() {
    let a = $('#x').val()
    let b = $('#reply').val()

    $.ajax({
        type: "POST",
        url: "/reply",
        data: {name_give: a,
                reply_give: b,
                },
        success: function (response) {
            alert(response["msg"])
        }
    });

}

var state = [0,0,0] // 각 입력 박스들의 열림/닫힘 상태


function show_comment() {
    $.ajax({
        type: "GET",
        url: "/comment",
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
                let temp_html2 = `
                                    <div style="margin-bottom:60px; margin-top:30px; list-style:none;">
                                    <h5 style=" font-family: 'TAEBAEKmilkyway'; margin-top:50px;">${comment}</h5><br>
                                    <div style=" font-family: 'TAEBAEKmilkyway'; text-align:right; font-size: 6px">${name}(${strdate})</div>
                                    </div>
                                    `
                $('#all_comments').append(temp_html2)
            }
        }
    })
}

function heart() {
    $.ajax({
        type: "PUSH",
        url: "/heart",
        data: {},
        success: function (response) {
            alert(response["msg"])
            show_heart()
        }
    });
}

function show_heart() {
    $.ajax({
        type: "GET",
        url: "/heart",
        data: {},
        success: function (response) {
            let rows = response['result']

            let total_heart = rows['heart']
            temp_html = `⚡에너지가 ${total_heart}번 충전되었습니다⚡`
            $('#heart').empty()
            $('#heart').append(temp_html)

        }
    });

}
