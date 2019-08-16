CREATE TABLE user_table(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
phone_number VARCHAR(20),
users_name VARCHAR(100),
pass_word VARCHAR(255)
);

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    question_number INT,
    answer VARCHAR(255),
    quiz INT
);
​
CREATE TABLE grades(
    id SERIAL PRIMARY KEY,
    grade INT,
    quiz INT,
    user_id INT REFERENCES user_table
);

CREATE TABLE quizzes(
    id SERIAL PRIMARY KEY,
    quiz INT,
    submit BOOLEAN
);

CREATE TABLE user_responses(
    id SERIAL PRIMARY KEY,
    response VARCHAR(255),
    question_number INT,
    quiz INT,
    user_id INT REFERENCES user_table
);