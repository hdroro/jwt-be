const mysql = require("mysql2");
import db from "../models/index";

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

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserList = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user", (error, results, fields) => {
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
      "SELECT * FROM user where id = ?",
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
    "DELETE FROM user where id = ?",
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
    "UPDATE user SET email = ?, username = ? where id = ?",
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
