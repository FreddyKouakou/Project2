function submitAnswers() {
    var responses = [];
    for (let i = 1; i <= 6; i++) {
        responses[i] = $('#' + i).val();
    }
    $.get("getAnswers", function(response) {
        var answers = response.answers;
        var score = 0;
        for (let i = 0; i < answers.length; i++) {
            var questionNumber = answers[i].question_number;
            var answer = answers[i].answer;
            if (responses[questionNumber] == answer) {
                ++score;
            }
        }
        $.get("updateScore", {grade: score}, function(response) {
            console.log("Success");
        });
    });
}