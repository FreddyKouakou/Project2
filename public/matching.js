function startButton() {
    $.get("getQuestions", function(response) {
        var questions = response.questions;
        console.log(questions);
        var sortedWords = [];
        for (let i = 0; i < questions.length; i++) {
            sortedWords.push(questions[i].answer);
        }
        sortedWords.sort();
        var dropDownHtml = "<option></option>";
        for (let i = 0; i < sortedWords.length; i++) {
            dropDownHtml += "<option>" + sortedWords[i] + "</option>";
        }
        dropDownHtml += "</select>";
        matchingTable = "<table>";
        for (let i = 0; i < questions.length; i++) {
            matchingTable += "<tr><td><img src='images/" + questions[i].answer + ".png'></td><td>" + "<select class='matchingTable' id='" + i +"'>" + dropDownHtml + "</td></tr>"; 
        }
        matchingTable += "</table>";
        matchingTable += "<button onclick='submitAnswers()' id='submitBtn'>Submit</button>";
        $("#dropdowns").html(matchingTable);
        
    });
}

function submitAnswers() {
    var message = "Are you sure you want to submit? Click OK or Cancel.";
    if (confirm(message)) {
        $.get("getQuestions", function(response) {
            var questions = response.questions;
            console.log(questions);
            var score = 0;
            for (let i = 0; i < questions.length; i++) {
                var answer = questions[i].answer;
                var userChoice = $("#" + i).find(":selected").text();
                if (userChoice == answer) {
                    ++score;
                }
            }
            $.get("updateScore", {grade: score}, function(response) {
                if (response.success) {
                    console.log('Grade is recorded in database!');
                }
            });
        });
    } else {
        console.log("Canceled.");
    }
}