import express from "express";
import authRoutes from "./authRoutes";

const router = express.Router();

router.post("", authRoutes);

export default router;
