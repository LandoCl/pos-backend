import express from "express";
import { getPurchases, createPurchase } from "../controllers/purchaseController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

router.get("/", jwtCheck, getPurchases);
router.post("/", jwtCheck, createPurchase);

export default router;
