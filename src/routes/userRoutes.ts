import express from "express";
import { createUser, updateUser } from "../controllers/userController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.post("/", jwtCheck, createUser);

router.put("/", jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
