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
const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:Christ05442603221@localhost:5432/project2'
const pool = new Pool({ connectionString: dbUrl })


//statics files path
app.use(express.static("public")) //My html file

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

                    if (err) console.log("Didn't get the user info" + err);
                    else {
                        console.log("User Account successfully created.")
                        // res.redirect("signin.html")
                    }
                });

            });
        } else {
            res.send("User name already exist")
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
        if (err) console.log("Error getting the user name" + err)
        var row = result.rows[0];
        if (row.pass_word == userPassWord) {
            res.redirect("exercises.html");
        } else {
            res.send("Wrong Password")
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
app.get("/getQuestions/:question_id", (req, res) => {
    var getQuestion = req.params.question_id
    var user_question = [getQuestion]
    pool.query("SELECT *FROM questions WHERE question_id = $1", user_question, (err, result) => {
        if (err) console.log("Still given troubles" + err)
        else {
            var displayQuestion = result.rows
            res.send(displayQuestion)
        }
    });
});


//Server
app.set("port", (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
    console.log("Connected on port ", app.get("port"))
});