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