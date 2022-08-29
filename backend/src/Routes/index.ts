import express from "express";
import Middleware from "../Middleware";
import GameValidator from "../Http/Validators/GameValidator";
import GameController from "../Http/Controllers/GameController";
import UserValidator from "../Http/Validators/UserValidator";
import UserController from "../Http/Controllers/UserController";

export const UserRouter = express.Router();

UserRouter.post("/", UserValidator.checkCreateUser(), Middleware.handleValidationError, UserController.create);
UserRouter.get("/", UserValidator.checkReadUser(), Middleware.handleValidationError, UserController.readWithPagination);
UserRouter.get("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.readByID);
UserRouter.put("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.update);
UserRouter.delete("/:id", UserValidator.checkIdParam(), Middleware.handleValidationError, UserController.delete);

export const GameRouter = express.Router();

GameRouter.post("/", GameValidator.checkCreateGame(), Middleware.handleValidationError, GameController.create);
GameRouter.get("/", GameValidator.checkReadGame(), Middleware.handleValidationError, GameController.readWithPagination);
GameRouter.get("/:id", GameValidator.checkIdParam(), Middleware.handleValidationError, GameController.readByID);
GameRouter.put("/:id", GameValidator.checkIdParam(), Middleware.handleValidationError, GameController.update);
GameRouter.delete("/:id", GameValidator.checkIdParam(), Middleware.handleValidationError, GameController.delete);
