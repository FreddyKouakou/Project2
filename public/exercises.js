function exercises(questionNumberValue){
    //call web service to provide the necessary information from the database
    query = {questionNumber : questionNumberValue}
    $.get("exercisePath", query, (data)=>{
        if(!data)console.log("Fail to provide question")
        else{
            $("#questions").html(data.question);
            $("#answera").html(data.answerA);
            $("#answerb").html(data.answerB);
            $("#answerc").html(data.answerC);
        }

    });
    
}