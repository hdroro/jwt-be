const handleHelloWorld = (req, res) => {
  return res.render("home.ejs", { name: "hdiem" });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
};
