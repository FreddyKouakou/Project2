$(document).ready(function() {
    var maxScores = [0, 2, 31]; // later change to database
    $.get("getGrades", function(response) {
        var grades = response.grades;
        console.log(grades);
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
        console.log(totalScore);
        $('#totalScore').html('Total Score: ' + totalScore);
        var percentage = totalScore * 100.0 / totalMaxScore;
        percentage = percentage.toFixed(2);
        $('#percentage').html('Percentage: ' + percentage + '%');
    });

});