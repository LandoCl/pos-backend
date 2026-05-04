import express from "express";
import { getProvider, createProvider, updateProvider } from "../controllers/providerController.js";
import { jwtCheck } from "../middleware/auth.js";

const router = express.Router();

router.get("/", jwtCheck, getProvider);
router.post("/", jwtCheck, createProvider);
router.put("/:id", jwtCheck, updateProvider);

export default router;
