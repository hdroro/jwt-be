import db from "../models/index";

const getAllUsers = async () => {
  let data = {
    EM: "",
    EX: "",
    DT: "",
  };
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true,
    });
    if (users) {
      console.log(users);
      //   let data = users.get({ plain: true });
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "something wrongs with service",
        EC: 1,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    await db.User.create({});
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      //update
      await user.save({
        //...
      });
    } else {
      //not found
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.deleteUser({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser };
