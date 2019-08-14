$(document).ready(function() {
    var maxScores = [0, 6, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // later change to database
    $.get("getGrades", function(response) {
        var grades = response.grades;
        var totalScore = 0;
        var totalMaxScore = 0;
        for (let i = 0; i < grades.length; i++) {
            var quiz = grades[i].quiz;
            $('#' + quiz + "total").html(maxScores[quiz]);
            var grade = grades[i].grade;
            totalScore += grade;
            totalMaxScore += maxScores[quiz];
            $('#' + quiz).html(grade);
        }

        $('#totalScore').html('Total Score: ' + totalScore);
        var percentage = totalScore * 100.0 / totalMaxScore;
        percentage = percentage.toFixed(2);
        $('#percentage').html('Percentage: ' + percentage + '%');
    });

});