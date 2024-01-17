import loginRegisterService from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    let { email, phone, password } = req.body;
    if (!email || !phone || !password) {
      return res.status(200).json({
        EM: "Missing required parameters", //error message
        EC: "-1", // error code
        DT: "", //date
      });
    }

    if (password && password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters", //error message
        EC: "-1", // error code
        DT: "", //date
      });
    }

    //service: create user
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: "", //date
    });
  } catch (error) {
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //date
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, // error code
      DT: data.DT, //date
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      EM: "error from server", //error message
      EC: "-1", // error code
      DT: "", //date
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
