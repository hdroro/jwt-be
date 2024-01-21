import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
// import connectDB from "./config/connectDB";
import bodyParse from "body-parser";
require("dotenv").config();
import { createJWT, verifyToken } from "./middleware/JWTActions";

const app = express();

//config view engine
configViewEngine(app);

//config CORS
configCors(app);

//config bodyparse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

//test jwt:
createJWT();
let decoded = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaG9uZ2RpZW0iLCJhZGRyZXNzIjoicXVhbmcgdHJpIiwiaWF0IjoxNzA1ODExNjI3fQ.1ofV9AieuiL790XHlVTrbAKWL7TDIvXQRyS5e3m0Mls"
);

// console.log(decoded);

initWebRoutes(app);
initApiRoutes(app);
// connectDB.connect();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT BE is running on the port = " + PORT);
});
