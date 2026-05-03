import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserRequest = [
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("username").notEmpty().withMessage("El nombre de usuario es requerido"),
  body("rol").isIn(["Admin", "User"]).withMessage("El rol es requerido"),
  handleValidationErrors,
];
