import express from "express";
import { reqParamsSchema } from "../utils/validators/authSchemas";

import { validateRequests } from "../utils/validateRequests";
import { userSignupSchema } from "../utils/validators/authSchemas";
import { userController } from "../controllers/userController";
import { userAuthController } from "../controllers/authController";
const router = express.Router();

router.get(
  "",
  userAuthController.authenticatedUser,
  userController.getAllUsers
);
router.post(
  "",
  validateRequests.validateRequst(userSignupSchema),
  userController.signUp
);

router.get(
  "/:id",
  validateRequests.validateRequestParams(reqParamsSchema),
  userController.getUserById
);
router.patch(
  "/:id",
  validateRequests.validateRequestParams(reqParamsSchema),
  userController.updateUserBirthDate
);
export default router;
