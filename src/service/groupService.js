import db from "../models/index";

const getAllGroups = async () => {
  try {
    let groups = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    if (groups) {
      return {
        EM: "get data success",
        EC: 0,
        DT: groups,
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
module.exports = {
  getAllGroups,
};
