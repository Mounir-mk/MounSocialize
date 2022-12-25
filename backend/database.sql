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
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

INSERT INTO post (title, content, user_id) VALUES ('My first post', 'This is my first post', 1),
('My second post title', 'This is my second post', 1),
('My third post title', 'This is my third post', 1); 