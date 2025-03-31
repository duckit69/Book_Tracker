import express from "express";
import { bookController } from "../controllers/bookController";
const router = express.Router();

router.get("", bookController.getBooksBySubjectFromDB);

router.get("/search", bookController.getBooksBySubjectFromAPI);
// router.post("", )
export default router;
// this has to move to book router
