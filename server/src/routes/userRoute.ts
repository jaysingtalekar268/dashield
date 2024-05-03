import express, { Request, Response } from "express";
import userController from "../controllers/userController"

const router = express.Router();

router.post("/register", userController.createCurrentUser)
router.post("/login", userController.getCurrentUser)
router.post("/logout", userController.handleLogOut)


export default router;