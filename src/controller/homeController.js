import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  return res.render("home.ejs", { name: "hdiem" });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let { email, password, username } = req.body;
  userService.createNewUser(email, password, username);

  return res.send("User created successfully");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
