import express from "express";
import { userSignupSchema } from "../../utils/validators/authSchemas";
import { userAuthController } from "../../controllers/userController/authController";
import { validateRequests } from "../../utils/validateRequests";

const router = express.Router();

router.post(
  "",
  validateRequests.validateSignup(userSignupSchema),
  userAuthController.signUp
);

export default router;
