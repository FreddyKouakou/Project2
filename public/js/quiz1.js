$(document).ready(function() {
    console.log('in function')
    $.get("getSubmitStatus", {quiz: 1}, function(response) {
        console.log(response.submit);
        if (!response.submit) {
            var submitBtnHtml = "<button onclick='submitAnswers()' id='submitBtn'>Submit</button>";
            $('#submit').html(submitBtnHtml);
        }
    });
});

function submitAnswers() {
    
    $.get("getAnswers", {quiz: 1}, function(response) {
        var answers = response.answers;
        var score = 0;
        var responses = [];
        for (let i = 0; i < answers.length; i++) {
            responses[i] = $('#' + (i + 1)).val();
        }

        // $('#submitBtn').remove();
        for (let i = 0; i < answers.length; i++) {
            var answer = answers[i].answer;
            if (responses[i] == answer) {
                ++score;
                $('#' + (i + 1)).css('border-color', 'green');
            } else {
                $('#' + (i + 1)).css('border-color', 'red');
            }
        }

        $.get("updateScore", {quiz: 1, grade: score}, function(response) {

        });

        // if (responses.length > 0) {
        //     $.get("insertUserResponses", {quiz: 1, responses: responses}, function(response) {

        //     });
        // }

        // $.get("updateSubmit", {quiz: 1}, function(response) {
        //     if (response.success) {
        //         console.log('Success!');
        //     }
        // });
        
    });
}