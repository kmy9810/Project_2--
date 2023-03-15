

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
            console.log(response['result'])
            window.location.href = "/member"
        }
    });

}


function detail_get(x) {
    $("#text_Box").empty()
    let category = $(x).val();
    $.ajax({
        type: 'GET',
        async: false,
        url: '/board/'+ category,
        data: {},
        success: function (response) {
            let rows = response['detail'];
            console.log(rows)
                let name = rows[0]["name"];
                let img = rows[0]["img"];
                let hobby = rows[0]["hobby"];
                let intro = rows[0]["intro"];
                let info_1 = rows[0]["info_1"];
                let info_2 = rows[0]["info_2"];
                let info_3 = rows[0]["info_3"];
                let info_4 = rows[0]["info_4"];

                let temp_description = `<table>
                                            <tr><td>${name}</td></tr>
                                            <tr><td>${hobby}</td></tr>
                                            <tr><td>${intro}</td></tr>
                                            <tr><td>${info_1}</td></tr>
                                            <tr><td>${info_2}</td></tr>
                                            <tr><td>${info_3}</td></tr>
                                            <tr><td>${info_4}</td></tr>
                                        </table>`;


                $("#text_Box").append(temp_description);
                $("#picture").attr("src", img);
        }
        
    });
}



