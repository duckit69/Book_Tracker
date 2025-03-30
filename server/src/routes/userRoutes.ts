import express from "express";
import { reqParamsSchema } from "../utils/validators/authSchemas";

import { validateRequests } from "../utils/validateRequests";
import { userSignupSchema } from "../utils/validators/authSchemas";
import { userController } from "../controllers/userController/userController";

const router = express.Router();

router.get("", userController.getUsers);
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
  userController.updateUser
);
export default router;
