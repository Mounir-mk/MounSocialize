CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  image LONGBLOB,
  hashed_password VARCHAR(255) NOT NULL
);

INSERT INTO user (firstname, lastname, email, hashed_password) VALUES ('John', 'Doe', 'johndoe@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$gLTgf5SzJJz/pF5+vtGL3g$t7eQQy8h7mdEubMpyNycaQQZl/H+r1FgFuaL62dxlSU');


CREATE TABLE post (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image LONGBLOB,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO post (title, content, user_id) VALUES ('My first post', 'This is my first post', 1),
('My second post', 'This is my second post', 1),
('My third post', 'This is my third post', 1);

CREATE TABLE comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (post_id) REFERENCES post(id)
);

INSERT INTO comment (content, user_id, post_id) VALUES ('This is my first comment', 1, 1),
('This is my second comment', 1, 1),
('This is my third comment', 1, 1);


CREATE TABLE favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status BOOLEAN DEFAULT 0,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (post_id) REFERENCES post(id)
);
 
INSERT INTO favorite (user_id, post_id) VALUES (1, 1),
(1, 2),
(1, 3);