$(document).ready(function() {
    console.log("Window loaded!")
    $.get("getGrades", function(response) {
        var grades = response.grades;
        for (let i = 0; i <= grades.length; i++) {
            var quiz = grades[i].quiz;
            var grade = grades[i].grade;
            $('#' + quiz).html(grade);
        }
    });

});