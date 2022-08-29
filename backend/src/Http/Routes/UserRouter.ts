import express from "express";
import Middleware from "../../Middleware";
import UserValidator from "../Validators/UserValidator";
import UserController from "../Controllers/UserController";

const UserRouter = express.Router();

UserRouter.post("/create", UserValidator.checkCreateUser(), Middleware.handleValidationError, UserController.create);

UserRouter.get("/", UserValidator.checkReadUser(), Middleware.handleValidationError, UserController.readWithPagination);

UserRouter.get("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.readByID);

UserRouter.put("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.update);

UserRouter.delete("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.delete);

export default UserRouter;
