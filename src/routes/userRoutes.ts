import express from "express";
import { createUser, updateUser, getUser } from "../controllers/userController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getUser);

router.post("/", jwtCheck, createUser);

router.put("/", jwtCheck, jwtParse, validateUserRequest, updateUser);

export default router;
