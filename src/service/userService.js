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
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (error, results, fields) => {
      if (error) {
        console.error("Error fetching user list:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users where id = ?",
      [id],
      (error, results, fields) => {
        if (error) {
          console.error("Error fetching user list:", error);
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const deleteUser = (id) => {
  connection.query(
    "DELETE FROM users where id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating new user:", error);
      }
      console.log("User deleted successfully");
    }
  );
};

const editNewUser = (email, username, id) => {
  connection.query(
    "UPDATE users SET email = ?, username = ? where id = ?",
    [email, username, id],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating new user:", error);
      }
    }
  );
};

module.exports = {
  createNewUser,
  getUserById,
  getUserList,
  deleteUser,
  editNewUser,
};
