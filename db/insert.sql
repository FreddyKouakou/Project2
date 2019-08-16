-- Quiz 2
INSERT INTO answers(question_number, answer, quiz) VALUES
    (1, 'cut', 2),
    (2, 'three', 2),
    (3, 'can', 2),
    (4, 'dress', 2),
    (5, 'cast', 2),
    (6, 'stop', 2),
    (7, 'lid', 2),
    (8, 'four', 2),
    (9, 'vest', 2),
    (10, 'run', 2),
    (11, 'toss', 2),
    (12, 'win', 2),
    (13, 'mom', 2),
    (14, 'jam', 2),
    (15, 'gum', 2),
    (16, 'hot', 2),
    (17, 'bat', 2),
    (18, 'pig', 2),
    (19, 'jet', 2),
    (20, 'class', 2),
    (21, 'up', 2),
    (22, 'bed', 2),
    (23, 'dad', 2),
    (24, 'sick', 2),
    (25, 'pen', 2),
    (26, 'rob', 2),
    (27, 'read', 2),
    (28, 'letter', 2),
    (29, 'lip', 2),
    (30, 'mop', 2),
    (31, 'hand', 2);

INSERT INTO user_table(users_name) VALUES ('mSchmidt');

INSERT INTO grades(grade, quiz, user_id) VALUES
    (0, 1, 1),
    (0, 2, 1),
    (0, 3, 1),
    (0, 4, 1),
    (0, 5, 1),
    (0, 6, 1),
    (0, 7, 1),
    (0, 8, 1),
    (0, 9, 1),
    (0, 10, 1),
    (0, 11, 1),
    (0, 12, 1),
    (0, 13, 1),
    (0, 14, 1);

-- Quiz 1
INSERT INTO answers(question_number, answer, quiz) VALUES
    (1, 'What', 1),
    (2, 'name', 1),
    (3, 'A', 1),
    (4, 'A', 1),
    (5, 'A', 1),
    (6, 'A', 1);

-- Quiz 3
INSERT INTO answers(question_number, answer, quiz) VALUES
    (1, 'know', 3),
    (2, 'on', 3),
    (3, 'time', 3),
    (4, 'and', 3),
    (5, 'month', 3),
    (6, 'year', 3),
    (7, 'Thank', 3),
    (8, 'every', 3);

-- Quiz 4
INSERT INTO answers(question_number, answer, quiz) VALUES
    (1, 'Good', 4),
    (2, 'are', 4),
    (3, 'fine', 4),
    (4, 'you', 4),
    (5, 'Great', 4),
    (6, 'This', 4),
    (7, 'meet', 4),
    (8, 'nice', 4),
    (9, 'you', 4);

-- Quiz 5
INSERT INTO answers(question_number, answer, quiz) VALUES
    (1, 'Where', 5),
    (2, 'Place', 5),
    (3, 'What', 5),
    (4, 'Person', 5),
    (5, 'Which', 5),
    (6, 'Choice', 5),
    (7, 'When', 5),
    (8, 'Time', 5),
    (9, 'When', 5),
    (10, 'Time', 5),
    (11, 'How', 5),
    (12, 'Condition', 5),
    (13, 'How', 5),
    (14, 'Condition', 5),
    (15, 'Where', 5),
    (16, 'Place', 5),
    (17, 'What', 5),
    (18, 'Item Description', 5);

INSERT INTO quizzes(quiz, submit) VALUES
    (1, FALSE),
    (2, FALSE),
    (3, FALSE),
    (4, FALSE),
    (5, FALSE),
    (6, FALSE),
    (7, FALSE),
    (8, FALSE),
    (9, FALSE),
    (10, FALSE),
    (11, FALSE),
    (12, FALSE),
    (13, FALSE),
    (14, FALSE);

INSERT INTO user_responses(response, question_number, quiz, user_id) VALUES
    ('', 1, 2, 1),
    ('', 2, 2, 1),
    ('', 3, 2, 1),
    ('', 4, 2, 1),
    ('', 5, 2, 1),
    ('', 6, 2, 1),
    ('', 7, 2, 1),
    ('', 8, 2, 1),
    ('', 9, 2, 1),
    ('', 10, 2, 1),
    ('', 11, 2, 1),
    ('', 12, 2, 1),
    ('', 13, 2, 1),
    ('', 14, 2, 1),
    ('', 15, 2, 1),
    ('', 16, 2, 1),
    ('', 17, 2, 1),
    ('', 18, 2, 1),
    ('', 19, 2, 1),
    ('', 20, 2, 1),
    ('', 21, 2, 1),
    ('', 22, 2, 1),
    ('', 23, 2, 1),
    ('', 24, 2, 1),
    ('', 25, 2, 1),
    ('', 26, 2, 1),
    ('', 27, 2, 1),
    ('', 28, 2, 1),
    ('', 29, 2, 1),
    ('', 30, 2, 1),
    ('', 31, 2, 1);
    
INSERT INTO user_responses(response, question_number, quiz, user_id) VALUES
    ('', 1, 3, 1),
    ('', 2, 3, 1),
    ('', 3, 3, 1),
    ('', 4, 3, 1),
    ('', 5, 3, 1),
    ('', 6, 3, 1),
    ('', 7, 3, 1),
    ('', 8, 3, 1);

