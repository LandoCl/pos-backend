import express from "express";
import { getProduct, createProduct, updateProduct } from "../controllers/productController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

router.get("/", jwtCheck, getProduct);
router.post("/", jwtCheck, createProduct);
router.put("/:id", jwtCheck, updateProduct);

export default router;
