import { body, param, query } from "express-validator";

class GameValidator {
  checkCreateGame() {
    return [];
  }

  checkReadGame() {
    return [
      query("limit")
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage("The limit value should be number and between 1-10"),
      query("offset").optional().isNumeric().withMessage("The value should be number"),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("The value should be not empty")
        .isUUID(4)
        .withMessage("The value should be uuid v4"),
    ];
  }
}

export default new GameValidator();
