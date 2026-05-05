import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { jwtCheck } from "../middleware/auth.js";
import { validateProductRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, getProduct);
router.post("/", jwtCheck, validateProductRequest, createProduct);
router.put("/:id", jwtCheck, validateProductRequest, updateProduct);

export default router;
