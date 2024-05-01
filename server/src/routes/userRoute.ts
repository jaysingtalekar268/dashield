import express, { Request, Response } from "express";
import userController from "../controllers/userController"

const router = express.Router();

router.post("/register", userController.createCurrentUser )

export default router;