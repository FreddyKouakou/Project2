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
const pool = new Pool({ connectionString: dbUrl });

// middleware to check login
const auth = function(req, res, next) {
    // req.session.userId = 1;
    // req.session.currentWeek = 14;
    // req.session.accountType = "admin";
    if (req.session.userId) {
        console.log("__dirname: " + __dirname);
        next();
    } else {
        res.render("index.ejs", {page: "signin", firstName: req.session.firstName});
    }
}

//statics files path
// app.use(express.static("public"))
app.use(express.static(__dirname + '/public'));

app.post("/createAccount", (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    var currentWeek = 1;
    var accountType = req.body.accountType;

    var checkUserName = "SELECT username FROM users WHERE username = $1";
    pool.query(checkUserName, [username], (err, result) => {
        if (err) { console.log("Error happens here" + err) }

        else if (result.rows.length == 0) {

            bcrypt.hash(password, 10, function (err, hash) {
                var userInfo = [firstName, lastName, username, phoneNumber, hash, currentWeek, accountType];
                // Store hash in database
                var insertIntodb = "INSERT INTO users(first_name, last_name, username, phone_number, password_hash, current_week, account_type) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id" //This insert the user's data in the variable $1...5 in the query
                pool.query(insertIntodb, userInfo, (err, result) => {

                    var sql = "INSERT INTO grades(grade, quiz, user_id) VALUES";
                    for (let i = 1; i <= 14; i++) {
                        sql += " (0, " + i + ", " + result.rows[0].id + ")";
                        if (i < 14) {
                            sql += ",";
                        } else {
                            sql += ";";
                        }
                    }
                    pool.query(sql, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({success: true});
                        }
                    });
                });

            });
        } else {
            res.send({errMessage: userName + " already exists."});
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
    pool.query("SELECT id, first_name, password_hash, current_week, account_type FROM users WHERE username = $1", userInfoArray, (err, result) => {
        if (err) {
            console.log("Error getting the user name" + err)

        } else {
            if (result.rows.length > 0) {

                //setting session
                bcrypt.compare(userPassWord, result.rows[0].password_hash, function (err, resMatch) {
                    if (resMatch) {
                        // Passwords match
                        req.session.userId = result.rows[0].id;
                        req.session.firstName = result.rows[0].first_name;
                        req.session.currentWeek = result.rows[0].current_week;
                        req.session.accountType = result.rows[0].account_type;
                        res.send({match: true});
                    } else {
                        // Passwords don't match
                        res.send({errMessage: "Wrong Password", match: false})
                    }
                });

            }else{
                res.send({errMessage: "Please verify your user name is correctly spelt", toRedirect: false})
            }
        }
    });

});

app.get('/signout', auth, (req, res) => {
    req.session.destroy();
    res.render("index.ejs", {page: "signin", firstName: null});
});

app.post('/updatePassword', (req, res) => {
    var password = req.body.password;
    bcrypt.hash(password, 10, (err, passwordHash) => {
        var values = [passwordHash, req.session.userId];
        var sql = "UPDATE users SET password_hash=$1 WHERE id=$2";
        pool.query(sql, values, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.send({success: true});
            }
        });
    });
    
});

app.get('/changePassword', auth, (req, res) => {
    res.render('index.ejs', {page: "changePassword", firstName: req.session.firstName})
});

app.get('/', (req, res) => {
    res.render('index.ejs', {page: "homepage", firstName: req.session.firstName});
});

app.get('/lesson', auth, (req, res) => {
    res.render('index.ejs', {page: "lessons", currentWeek: req.session.currentWeek, firstName: req.session.firstName});
});

app.get('/home', (req, res) => {
    res.render('index.ejs', {page: "homepage", firstName: req.session.firstName});
});

app.get('/signin', (req, res) => {
    res.render('index.ejs', {page: "signin", firstName: req.session.firstName});
});

app.get('/admin', auth, (req, res) => {
    if (req.session.accountType == "admin") {
        var sql = "SELECT first_name, last_name, username, phone_number, account_type FROM users";
        pool.query(sql, (err, result) => {
            res.render('index.ejs', {page: "admin", users: result.rows, firstName: req.session.firstName});
        });
    } else {
        res.render('index.ejs', {page: "signin", firstName: req.session.firstName});
    }
    
    
});

app.get('/quiz', auth, (req, res) => {
    var quiz = req.query.qn;
    res.render('index.ejs', {page: "quiz/quiz" + quiz, firstName: req.session.firstName});
});

app.get('/grades', auth, (req, res) => {
    var values = [req.session.userId];
    console.log("userId: " + req.session.userId);
    var sql = "SELECT grade FROM grades WHERE user_id=$1 ORDER BY quiz";
    pool.query(sql, values, function(err, result) {
        console.log("result.rows:" + result.rows);
        res.render('index.ejs', {page: "grades", grades: result.rows, currentWeek: req.session.currentWeek, firstName: req.session.firstName});
    });
    
});

app.get("/updateScore", (req, res) => {
    var grade = req.query.grade;
    var quiz = req.query.quiz;
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
    var quiz = req.query.quiz;
    var values = [quiz];
    var sql = "SELECT question_number, answer FROM answers WHERE quiz=$1 ORDER BY question_number";
    pool.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            var answers = result.rows;
            res.send({answers: answers});
        }
    });
});

app.get("/getSubmit", (req, res) => {
    var quiz = req.query.quiz;
    var values = [quiz];
    var sql = "SELECT submit FROM quizzes WHERE quiz=$1";
    pool.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            var submit = result.rows[0].submit;
            res.send({submit: submit});
        }
    });
});

app.get("/updateSubmit", (req, res) => {
    var quiz = req.query.quiz;
    var values = [quiz];
    var sql = "UPDATE quizzes SET submit=TRUE WHERE quiz=$1";
    pool.query(sql, values, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({success: true});
        }
    });
});

app.get("/insertUserResponses", (req, res) => {
    var quiz = req.query.quiz;
    var userId = 1; // change to session
    var responses = req.query.responses;
    var sql = "UPDATE user_responses SET ";
    for (let i = 0; i < responses.length; i++) {
        sql += "response='" + responses[i] + "' WHERE question_number=" + (i + 1) + " AND quiz=" + quiz + " AND user_id=" + userId;
        if (i == responses.length - 1) {
            sql += ";";
        } else {
            sql += ", ";
        }
    }
    console.log(sql);

    pool.query(sql, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({success: true});
        }
    });
});

//Server
app.set("port", (process.env.PORT || 8000))
app.listen(app.get("port"), () => {
    console.log("Connected on port ", app.get("port"))
});