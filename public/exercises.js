/**
 * Function: exercises
 * Description: This function 
 */
function exercises(questionNumberValue){
    //call web service to provide the necessary information from the database
    query = {questionNumber : questionNumberValue}
    $.get("exercisePath", query, (data)=>{
         if(!data)console.log("Fail to provide question")
        else{
            $("#questions").html(data[0].question);
            $("#answera").html(`<input value="A" type="radio" name="btn">`+ data[0].answera);
            $("#answerb").html(`<input value="B" type="radio" name="btn">`+ data[0].answerb);
            $("#answerc").html(`<input value="C" type="radio" name="btn">`+ data[0].answerc);
            $("#correctAnswers").val(data[0].correct_answer);
            $("#questionNumbers").val(data[0].question_id);
        }

    });

        $("#submitAnswers").html(`<button onClick="submitAnswers()">Submit Answer</button>`);
}

function getQuestion() {
    $.get("getQuestion", function(response) {
        var question = response.question;
        $("#question").html(question);
    });

}

function submitAnswer() {
    var userResponse = $("#userResponse").val();
    $.get("getAnswer", function(response) {
        var answer = response.answer;
        if (userResponse == answer) {
            alert("Well done!");
            $.get("incrementQuestion", function(data) {
                console.log("Inside incrementQuestion");
                getQuestion();
            });
        } else {
            alert("Give it another try!");    
        }
    });
}
/**
 * Submit Answers
 */
function submitAnswers(){
    var selectedAnswer = $(`[name="btn"]:checked`).val();
    var theCorrectAnswer = $("#correctAnswers").val();
    var questionNum = Number($("#questionNumbers").val()) +1;
    console.log(questionNum);
    if(selectedAnswer == theCorrectAnswer){
       
        alert("Well done!");
        exercises(questionNum);
    }else{
        alert("Give it another try!");
    }
}

/**
 * Start Button
 */
function startButton(){
    $("#startBtn").html("");
    getQuestion();
}
