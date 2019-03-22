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
app.use(express.urlencoded({extended:true}));//This is for the POST request

// connect to postgres database
const { Pool } = require('pg')
const dbUrl = process.env.DATABASE_URL || 'postgres://postgres:Christ05442603221@localhost:5432/project2'
const pool = new Pool({ connectionString: dbUrl })


//statics files path
app.use(express.static("public")) //My html file

/******************************************************************************
* Function:app.get("/createUser")
* Description: This block insert the user's information in the Database
* The user information is provided the by the user through the 
static file (html form) located in the public folder
 ******************************************************************************/
app.get("/createUser", (req, res) => {
    var firstName = req.query.first_name;
    var lastName = req.query.last_name;
    var userName = req.query.user_name;
    var phoneNumber = req.query.phone_number;
    var passWord = req.query.pass_word;
    var userInfo = [firstName, lastName, userName, phoneNumber, passWord]
    var insertIntodb = "INSERT INTO user_table(first_name, last_name, users_name, phone_number, pass_word) VALUES($1, $2, $3, $4, $5) " //This insert the user's data in the variable $1...5 in the query
    pool.query(insertIntodb, userInfo, (err, result) => {
        if (err) console.log("Didn't get the user info" + err);
        else { res.send("User Account successfully created.") }
    });
});
//Displays the json in the browser
app.get("/getUser/:users_name", (req, res) => {
    var getUserName = req.params.users_name
    var user_name_on_try = [getUserName]
    pool.query("SELECT *FROM user_table WHERE users_name = $1", user_name_on_try, (err, result) => {
        if (err) console.log("Still given troubles" + err)
        else {
            var displayNameArray = result.rows
            res.send(displayNameArray)
        }
    });
});

//Querying questions form the questions table
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

app.post("/signin", (req, res) => {
    var userSignIn = req.body.username;
    var userPassWord = req.body.password;
    var userInfoArray = [userSignIn];
    pool.query("SELECT pass_word FROM user_table WHERE users_name = $1", userInfoArray, (err, result)=>{
        if(err) console.log("Error getting the user name"+err)
        var row  = result.rows[0];

        console.log(row.pass_word);
        console.log(row.users_name);
        if(err) console.log("Error getting the user name")
        if(row.pass_word == userPassWord){
            res.redirect("homepage.html"); 
    }else{
        res.redirect("signin.html");
    }
});
});
/***
 * Create the web service for the question 
 * using get()
 */
app.get("/exercisePath", (req, res)=>{
var questionNumberSent = req.query.questionNumber;
pool.query("SELECT * FROM questions WHERE question_id = $1", [questionNumberSent], (err, result)=>{
    if(err) console.log("Couldn't get questions")
    else{
        res.json(result.rows);
    }
});
});

//Server
app.set("port", (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
    console.log("Connected on port ", app.get("port"))
});