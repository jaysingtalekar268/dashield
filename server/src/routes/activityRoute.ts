import express, { Request, Response } from "express";
import activityController from "../controllers/activityController"
const router = express.Router();

router.get("/myactivities", activityController.getUserActivity)

export default router