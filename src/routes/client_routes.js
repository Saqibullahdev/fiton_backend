const express = require("express");
const clientRouter = express.Router();
const {
  isClient,
  createClientValidator,
  isAdmin,
} = require("../middlewares/index");

const {
  createClient,
  loginClient,
  logoutClient,
  isLoggedIn,
  deleteClient,
  getClientById,
  updateClient,
  ChangePassword,
} = require("../controllers/client_controller");

clientRouter.post("/create", createClientValidator, createClient);
clientRouter.post("/login", loginClient);
clientRouter.post("/logout", logoutClient);
clientRouter.get("/isloggedin", isClient, isLoggedIn);
clientRouter.delete("/delete", isAdmin, deleteClient);
clientRouter.get("/", isClient, getClientById);
clientRouter.patch("/", isClient, updateClient);
clientRouter.patch("/password", isClient, ChangePassword);

module.exports = clientRouter;
