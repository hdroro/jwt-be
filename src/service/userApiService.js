import db from "../models/index";

const getAllUsers = async () => {
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true,
      nest: true,
      offset: offset,
      limit: limit,
    });

    let data = {
      totalRows: count,
      totalPages: Math.ceil(count / limit),
      users: rows,
    };
    return {
      EM: "OK",
      EC: 0,
      DT: data,
    };
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
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "Delete user successfully!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from service",
      EC: 2,
      DT: [],
    };
  }
};

module.exports = {
  getAllUsers,
  getUserWithPagination,
  createNewUser,
  updateUser,
  deleteUser,
};
