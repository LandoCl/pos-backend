import express from "express";
import { getSales, createSale } from "../controllers/saleController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateSaleRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, getSales);
router.post("/", jwtCheck, jwtParse, validateSaleRequest, createSale);

export default router;
