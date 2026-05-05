import express from "express";
import {
  getPurchases,
  createPurchase,
} from "../controllers/purchaseController.js";
import { jwtCheck } from "../middleware/auth.js";
import { validatePurchaseRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, getPurchases);
router.post("/", jwtCheck, validatePurchaseRequest, createPurchase);

export default router;
