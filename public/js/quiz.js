function submitAnswers(quizNumber) {
    var message = "Are you sure you want to submit? Click OK or Cancel.";
    if (confirm(message)) {
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
        console.log("Canceled.");
    }
}