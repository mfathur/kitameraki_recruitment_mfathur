import { body } from "express-validator";

const checkTaskBodyRequest = () => {
  return [
    body("title")
      .exists()
      .withMessage("title is required")
      .bail()
      .notEmpty()
      .withMessage("title cannot be empty")
      .bail()
      .isString()
      .withMessage("title type must be string"),
  ];
};

export default checkTaskBodyRequest;
