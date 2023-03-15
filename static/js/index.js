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