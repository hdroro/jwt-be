import db from "../models/index";

const getAllRoles = async () => {
  try {
    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      raw: true,
      nest: true,
    });
    if (roles) {
      return {
        EM: "Get all roles succeeds...",
        EC: 0,
        DT: roles,
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

const getRoleWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.Role.findAndCountAll({
      attributes: ["id", "url", "description"],
      order: [["id", "DESC"]],
      raw: true,
      nest: true,
      offset: offset,
      limit: limit,
    });

    let data = {
      totalRows: count,
      totalPages: Math.ceil(count / limit),
      roles: rows,
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

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (persists.length === 0) {
      return {
        EM: "Nothing to create ...",
        EC: 0,
        DT: [],
      };
    } else {
      await db.Role.bulkCreate(persists);
      return {
        EM: `Create roles succeeds: ${persists.length}...`,
        EC: 0,
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

const updateRole = async (id, url, description) => {
  try {
    const role = await db.Role.findOne({
      where: {
        id: id,
      },
    });
    if (role) {
      role.url = url;
      role.description = description;

      await role.save();

      return {
        EM: "Edit a role successfully!",
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

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });

    if (role) {
      await role.destroy();
      return {
        EM: "Delete role successfully!",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Role not exist",
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
  getAllRoles,
  getRoleWithPagination,
  createNewRoles,
  updateRole,
  deleteRole,
};
