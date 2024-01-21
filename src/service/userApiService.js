import db from "../models/index";

import bcypt from "bcryptjs";

const salt = bcypt.genSaltSync(10);

const hashUserPassword = (password) => {
  //   console.log(bcypt.compareSync(password, bcypt.hashSync(password, salt)));
  return bcypt.hashSync(password, salt);
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) return true;
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) return true;
  return false;
};

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
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      order: [["id", "DESC"]],
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

const createNewUser = async (
  email,
  password,
  username,
  phone,
  gender,
  address,
  group
) => {
  try {
    console.log("email", email);
    let isEmailExist = await checkEmailExist(email);
    if (isEmailExist) {
      return {
        EM: "The email is already exist!",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(phone);
    if (isPhoneExist) {
      return {
        EM: "The phone number is already exist!",
        EC: 1,
      };
    }

    let hashPassword = hashUserPassword(password);

    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
      phone: phone,
      sex: gender,
      address: address,
      groupId: group,
    });

    return {
      EM: "Create a user successfully!",
      EC: 0,
      DT: [],
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

const updateUser = async (id, username, gender, address, group) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      user.username = username;
      user.address = address;
      user.sex = gender;
      user.groupId = group;

      await user.save();

      return {
        EM: "Edit a user successfully!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Something went wrong with the service",
      EC: 1,
      DT: [],
    };
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
