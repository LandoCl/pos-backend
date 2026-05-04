import express from "express";
import { getSales, createSale } from "../controllers/saleController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";

const router = express.Router();

router.get("/", jwtCheck, getSales);
router.post("/", jwtCheck, jwtParse, createSale);

export default router;
