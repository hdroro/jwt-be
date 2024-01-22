require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/", "/login", "/register"];
const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};

const checkUserJWT = (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    console.log("cookies", cookies);
    if (cookies && cookies.jwt) {
      let token = cookies.jwt;
      let decoded = verifyToken(token);

      console.log("decodeddecoded", decoded);
      if (decoded) {
        console.log("hii");
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({
          EC: -1,
          DT: "",
          EM: "Not authenticated the user!",
        });
      }
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles;

    let currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't have permission to access this resource...!`,
      });
    }

    let canAcces = roles.some((item) => item.Roles.url === currentUrl);
    if (canAcces) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: "",
        EM: `You don't have permission to access this resource...!`,
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user!",
    });
  }
};

module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission };
