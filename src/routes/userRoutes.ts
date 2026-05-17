import express from "express";
import { createUser, updateUser, getUser, getAllUsers, updateUserById, deleteUser } from "../controllers/userController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getUser);

router.get("/all", jwtCheck, getAllUsers);

router.post("/", jwtCheck, createUser);

router.put("/", jwtCheck, jwtParse, validateUserRequest, updateUser);

router.put("/:id", jwtCheck, updateUserById);

router.delete("/:id", jwtCheck, deleteUser);

export default router;
