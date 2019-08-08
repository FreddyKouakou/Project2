function startButton() {
    $.get("getQuestions", function(response) {
        var questions = response.questions;
        console.log(questions);
        var sortedWords = [];
        for (let i = 0; i < questions.length; i++) {
            sortedWords.push(questions[i].answer);
        }
        sortedWords.sort();
        var dropDownHtml = "<select id='matchingTable'>";
        for (let i = 0; i < sortedWords.length; i++) {
            dropDownHtml += "<option>" + sortedWords[i] + "</option>";
        }
        dropDownHtml += "</select>";
        matchingTable = "<table>";
        for (let i = 0; i < questions.length; i++) {
            matchingTable += "<tr><td><img src='images/" + questions[i].answer + ".png'></td><td>" + dropDownHtml + "</td></tr>"; 
        }
        matchingTable += "</table>";
        $("#dropdowns").html(matchingTable);
        
    });
}