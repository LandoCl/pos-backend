import express from "express";
import {
  getProvider,
  getProviderById,
  createProvider,
  updateProvider,
} from "../controllers/providerController.js";
import { jwtCheck } from "../middleware/auth.js";
import { validateProviderRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, getProvider);
router.get("/:id", jwtCheck, getProviderById);
router.post("/", jwtCheck, validateProviderRequest, createProvider);
router.put("/:id", jwtCheck, validateProviderRequest, updateProvider);

export default router;
