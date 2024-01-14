const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "sa123",
  database: "jwt",
});

import bcypt from "bcryptjs";

const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  //   console.log(bcypt.compareSync(password, bcypt.hashSync(password, salt)));
  return bcypt.hashSync(password, salt);
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPassword, username],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating new user:", error);
      }
      console.log("User created successfully");
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query("Select * from users", (error, results, fields) => {
    if (error) {
      console.error("Error creating new user:", error);
    }
    console.log(`"User created successfully"`);
  });
};

module.exports = { createNewUser, getUserList };
