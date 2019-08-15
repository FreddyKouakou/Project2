function signupButton() {
    var firstName = $("#firstName").val()
    var lastName = $("#lastName").val()
    var phoneNumber = $("#phoneNumber").val()
    var userName = $("#userName").val()
    var userPassWord = $("#passWord").val()
    $.post("/signUp", { userName: userName, userPassWord: userPassWord, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber }, (data) => {
        if(data.toRedirect == true){
            //redirecting from js
                window.location.replace("signin.html")
            }else{
                $("#signUpData").html(data.errMessage)
            }
    })
}