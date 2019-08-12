/******************************************************************************
 * Author: Freddy Kouakou
 * Description: Project 2 is an English learning Web application
 * 
 ******************************************************************************/

const express = require("express")
const app = express()
//Setting the views folder
app.set('view engine', 'ejs')//This is for the ejs pages
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }));//This is for the POST request
const session = require("express-session")
const bcrypt = require('bcrypt');

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true
}));

// connect to postgres database
const { Pool } = require('pg')
const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/freddy_english'
const pool = new Pool({ connectionString: dbUrl })


//statics files path
app.use(express.static("public")) //My html files

/**
 * This is the homepage route
 */
app.get("/", (req, res) => {

    res.redirect("homepage.html")
})



/******************************************************************************
* Function:app.get("/createUser")
* Description: This block insert the user's information in the Database
* The user information is provided the by the user through the 
* static file (html form) located in the public folder
 ******************************************************************************/
app.post("/signUp", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userName = req.body.userName;
    var phoneNumber = req.body.phoneNumber;
    var passWord = req.body.userPassWord;

    var checkUserName = "SELECT users_name FROM user_table WHERE users_name = $1"
    pool.query(checkUserName, [userName], (err, result) => {
        if (err) { console.log("Error happens here" + err) }

        else if (result.rows.length == 0) {
            console.log(result.rows.length)

            bcrypt.hash(passWord, 10, function (err, hash) {
                var userInfo = [firstName, lastName, userName, phoneNumber, hash]
                // Store hash in database
                var insertIntodb = "INSERT INTO user_table(first_name, last_name, users_name, phone_number, pass_word) VALUES($1, $2, $3, $4, $5) " //This insert the user's data in the variable $1...5 in the query
                pool.query(insertIntodb, userInfo, (err, result) => {

                    if (err) {
                        console.log("Didn't get the user info" + err)
                    }
                    else {
                        res.send({ toRedirect: true })
                    }
                });

            });
        } else {
            res.send({ errMessage: userName + " already exist.", toRedirect: false })
        }
    })

});

/******************************************************************************
 * Function: POST()
 * Description: This function verifies the user's sign in information
 * password and username
 ******************************************************************************/
app.post("/signin", (req, res) => {
    var userSignIn = req.body.userName;
    var userPassWord = req.body.userPassWord;
    var userInfoArray = [userSignIn];
    pool.query("SELECT pass_word FROM user_table WHERE users_name = $1", userInfoArray, (err, result) => {
        if (err) {
            console.log("Error getting the user name" + err)

        } else {
            if (result.rows.length > 0) {

                //setting session
                bcrypt.compare(userPassWord, result.rows[0].pass_word, function (err, resMatch) {
                    if (resMatch) {
                        // Passwords match
                        req.session.userName = userSignIn
                        res.send({ toRedirect: true });
                    } else {
                        // Passwords don't match
                        res.send({ errMessage: "Wrong Password", toRedirect: false })
                    }
                });

            }else{
                res.send({errMessage: "Please verify your user name is correctly spelt", toRedirect: false})
            }
        }
    });

});

/******************************************************************************
 * Create the web service for the question 
 * using get()
 ******************************************************************************/
app.get("/exercisePath", (req, res) => {
    var questionNumberSent = req.query.questionNumber;
    pool.query("SELECT * FROM questions WHERE question_id = $1", [questionNumberSent], (err, result) => {
        if (err) console.log("Couldn't get questions")
        else {
            console.log(result.rows);
            res.json(result.rows);
        }
    });
});

/******************************************************************************
 * Function: GET()
 * Description: This function retrieve the questions and send it them to 
 * the  browser.(Querying questions form the questions table)
 ******************************************************************************/
//Displays the json in the browser
app.get("/getUser/:users_name", (req, res) => {
    var getUserName = req.params.users_name
    var user_name_on_try = [getUserName]
    pool.query("SELECT * FROM user_table WHERE users_name = $1", user_name_on_try, (err, result) => {
        if (err) console.log("Still given troubles" + err)
        else {
            var displayNameArray = result.rows
            res.send(displayNameArray)
        }
    });
});

/******************************************************************************
 * Function: GET()
 * Description: This function retrieve the questions and send it them to 
 * the  browser.(Querying questions form the questions table)
 ******************************************************************************/
app.get("/getQuestions", (req, res) => {
    var questions = session.questions;
    console.log(questions);
    res.send({questions: questions});
});

app.get('/lessons', (req, res) => {
    res.render('lessons.ejs');
});

app.get('/quiz', (req, res) => {
    var quiz = 1; // change to query
    var values = [quiz];
    pool.query("SELECT * FROM questions WHERE quiz=$1", values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            session.questions = result.rows;
            session.questionNumber = 0;
            res.render('quiz1.ejs');
        }
    });
    
});

app.get('/matching', (req, res) => {
    var quiz = 2; // change to query
    var values = [quiz];
    pool.query("SELECT * FROM questions WHERE quiz=$1", values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            session.questions = result.rows;
            session.questionNumber = 0;
            res.render('matching.ejs');
        }
    });
    
});

app.get('/getQuestion', (req, res) => {
    var questionNumber = session.questionNumber;
    console.log("getQuestion: " + questionNumber);
    var questions = session.questions;
    var question = questions[questionNumber].question;
    question = {question: question};
    res.send(question);
});

app.get('/getAnswer', (req, res) => {
    var questionNumber = session.questionNumber;
    console.log("getAnswer: " + questionNumber);
    var questions = session.questions;
    var answer = questions[questionNumber].answer;
    answer = {answer: answer};
    res.send(answer);
});

app.get('/incrementQuestion', (req, res) => {
    session.questionNumber++;
    res.send("Text");
});

app.get('/grades', (req, res) => {
    res.render('grades.ejs');
});

app.get('/getGrades', (req, res) => {
    var values = [1]; // change to session 
    var sql = "SELECT * FROM grades WHERE user_id=$1";
    pool.query(sql, values, function(err, result) {
        var grades = result.rows;
        res.send({grades: grades});
    });
});

app.get("/updateScore", (req, res) => {
    var grade = req.query.grade;
    var quiz = 1; // change to session
    var userId = 1; // change to session
    var values = [grade, quiz, userId];
    var sql = "UPDATE grades SET grade=$1 WHERE quiz=$2 AND user_id=$3";
    pool.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({success: true});
        }
    });
});

app.get("/getAnswers", (req, res) => {
    var quiz = 1; // change to session
    var values = [quiz];
    var sql = "SELECT question_number, answer FROM answers WHERE quiz=$1";
    pool.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            var answers = result.rows;
            res.send({answers: answers});
        }
    });
});

//Server
app.set("port", (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
    console.log("Connected on port ", app.get("port"))
});