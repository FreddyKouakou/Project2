$(document).ready(function() {
    $.get("getAnswers", {quiz: 2}, function(response) {
        var answers = response.answers;
        var sortedWords = [];
        for (let i = 0; i < answers.length; i++) {
            sortedWords.push(answers[i].answer);
        }
        sortedWords.sort();
        var dropDownHtml = "<option></option>";
        for (let i = 0; i < sortedWords.length; i++) {
            dropDownHtml += "<option>" + sortedWords[i] + "</option>";
        }
        dropDownHtml += "</select>";
        matchingTable = "<table>";
        for (let i = 0; i < answers.length; i++) {
            matchingTable += "<tr><td><img src='images/" + answers[i].answer + ".png'></td><td>" + "<select class='matchingTable' id='" + i +"'>" + dropDownHtml + "</td></tr>"; 
        }
        matchingTable += "</table>";
        matchingTable += "<button onclick='submitAnswers()' id='submitBtn'>Submit</button>";
        $("#dropdowns").html(matchingTable);
        
    });
});

function submitAnswers() {
    var message = "Are you sure you want to submit? Click OK or Cancel.";
    if (confirm(message)) {
        $.get("getAnswers", {quiz: 2}, function(response) {
            var answers = response.answers;
            var score = 0;
            for (let i = 0; i < answers.length; i++) {
                var answer = answers[i].answer;
                var userChoice = $("#" + i).find(":selected").text();
                if (userChoice == answer) {
                    ++score;
                    $('#' + i).css('border-color', 'green');
                } else {
                    $('#' + i).css('border-color', 'red');
                }
            }
            $.get("updateScore", {grade: score, quiz: 2}, function(response) {
                if (response.success) {
                    console.log("Score Updated!")
                }
            });
        });
    } else {
        console.log("Canceled.");
    }
}