import { body, param, query } from "express-validator";

class UserValidator {
  checkCreateUser() {
    return [
      body("id").optional().isUUID(4).withMessage("The value should be UUID v4"),
      body("firstname").notEmpty().withMessage("The firstname value should not be empty"),
      body("lastname").notEmpty().withMessage("The lastname value should not be empty"),
      body("email")
        .notEmpty()
        .withMessage("The email value should not be empty")
        .isEmail()
        .withMessage("The email value is invalid"),
      /* body("password")
        .notEmpty()
        .withMessage("The password value should not be empty")
        .isLength({ min: 6 })
        .withMessage("The password value should be minimum 6 character")
        .matches("^.*")
        .isStrongPassword()
        .matches("(?=.*[a-zA-Z])")
        .withMessage("The password value should have letters") */
      body("phone")
        .optional()
        .notEmpty()
        .withMessage("The phone value should not be empty")
        .isMobilePhone("any")
        .withMessage("The phone value is invalid"),
      body("balance").optional().isNumeric().withMessage("The balance value should be number"),
      body("isConnected")
        .optional()
        .isBoolean()
        .withMessage("The value should be boolean")
        .isIn([0, false])
        .withMessage("The value should be 0 or false"),
    ];
  }

  checkReadUser() {
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

export default new UserValidator();
