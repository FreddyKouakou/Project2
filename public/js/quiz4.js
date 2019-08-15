function submitAnswers() {
    var message = "Are you sure you want to submit? Click OK or Cancel.";
    if (confirm(message)) {
        $.get("getAnswers", {quiz: 4}, function(response) {
            var answers = response.answers;
            var score = 0;
            console.log(answers);
            for (let i = 0; i < answers.length; i++) {
                var answer = answers[i].answer;
                var userChoice = $("#" + i).find(":selected").text();
                if (userChoice == answer) {
                    $('#' + i).css('border-color', 'green');
                    ++score;
                } else {
                    $('#' + i).css('border-color', 'red');
                }
            }
            $.get("updateScore", {grade: score, quiz: 4}, function(response) {
                if (response.success) {
                    console.log("success");
                    // window.location.replace('grades');
                }
            });
        });
    } else {
        console.log("Canceled.");
    }
}