import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", jwtCheck, getDashboardStats);

export default router;
