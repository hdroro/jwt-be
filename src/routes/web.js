import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.get("/user-edit/:id", homeController.handleGetUserById);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/users/delete-user/:id", homeController.handleDeleteUser);
  router.post("/users/edit-user/:id", homeController.handleEditUser);

  return app.use("/", router);
};

export default initWebRoutes;
