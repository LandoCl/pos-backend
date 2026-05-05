import express from "express";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { jwtCheck } from "../middleware/auth.js";
import { validateProductRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, getProduct);
router.get("/:code", jwtCheck, getProductById);
router.post("/", jwtCheck, validateProductRequest, createProduct);
router.put("/:id", jwtCheck, validateProductRequest, updateProduct);

export default router;
