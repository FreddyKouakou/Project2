CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(255),
    username VARCHAR(255),
    password_hash VARCHAR(255),
    current_week INT,
    account_type VARCHAR(255)
);

INSERT INTO users(first_name, last_name, phone_number, username, account_type) VALUES ('Freddy', 'Kouakou', '+123456789', 'fkouakou', 'admin');

CREATE TABLE answers(
    id SERIAL PRIMARY KEY,
    question_number INT,
    answer VARCHAR(255),
    quiz INT
);

CREATE TABLE grades(
    id SERIAL PRIMARY KEY,
    grade INT,
    quiz INT,
    user_id INT REFERENCES users
);

CREATE TABLE quizzes(
    id SERIAL PRIMARY KEY,
    quiz INT,
    submit BOOLEAN
);

