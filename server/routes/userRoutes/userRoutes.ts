import express from "express";
import { validateRequests } from "../../utils/validateRequests";
import { userSignupSchema } from "../../utils/validators/authSchemas";
import { userController } from "../../controllers/userController/userController";

const router = express.Router();

router.post(
  "",
  validateRequests.validateRequst(userSignupSchema),
  userController.signUp
);

export default router;
