import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
// import connectDB from "./config/connectDB";
import bodyParse from "body-parser";
require("dotenv").config();

const app = express();

//config view engine
configViewEngine(app);

//config CORS
configCors(app);

//config bodyparse
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// console.log(decoded);

initWebRoutes(app);
initApiRoutes(app);
// connectDB.connect();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("JWT BE is running on the port = " + PORT);
});
