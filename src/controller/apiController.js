const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = (req, res) => {
  console.log(">>> call register");
  console.log(req.body);
};

const handleLogin = (req, res) => {
  console.log(">>> call login");
  console.log(req.body);
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
