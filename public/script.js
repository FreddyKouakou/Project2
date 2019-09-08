function confirmPassword() {
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    if (password.length && password == confirmPassword) {
        $("#passwordMatch").hide();
        $("#submitBtn").show();
    } else {
        $("#passwordMatch").show();
        $("#submitBtn").hide();
    }
}

function createAccount() {
    var firstName = $("#firstName").val()
    var lastName = $("#lastName").val()
    var phoneNumber = $("#phoneNumber").val()
    var username = $("#username").val()
    var password = $("#password").val()
    var accountType = $("#accountType").find(":selected").val();
    var params = {firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, username: username, password: password, accountType: accountType}
    $.post("createAccount", params, (response) => {
        if (response.success) {
            location.reload();
        } else {
            $("#signUpData").html(response.errMessage)
        }
    });
}

function submitAnswers(quizNumber) {
    var message = "Are you sure you want to submit? Click OK or Cancel.";
    if (confirm(message)) {
        if (quizNumber != 14) {
            $.get("getAnswers", {quiz: quizNumber}, function(response) {
                var answers = response.answers;
                var score = 0;
                for (let i = 0; i < answers.length; i++) {
                    var answer = answers[i].answer;
                    var userChoice = $("#" + i).val();
                    if (userChoice == answer) {
                        ++score;
                        $('#' + i).css('border-color', 'green');
                    } else {
                        $('#' + i).css('border-color', 'red');
                    }
                }
                $.get("updateScore", {grade: score, quiz: quizNumber}, function(response) {
                    if (response.success) {
                        console.log("Score Updated!")
                    }
                });
            });
        } else {
            alert("Your responses have been submitted to your instructor for grading.");
        }
    } else {
        console.log("Canceled.");
    }
}

function submitButton(){
    var userName = $("#inputUserName").val()
    var userPassWord = $("#inputPassWord").val()
    $.post("/signin", {userName : userName, userPassWord : userPassWord}, (data)=>{
     if(data.toRedirect == true){
     //redirecting from js
         window.location.replace("exercises.html")
     }else{
         $("#serverData").html(data.errMessage)
     }
 
    })   
 }