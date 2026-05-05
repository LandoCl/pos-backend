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
  body("rol").isIn(["admin", "cashier"]).withMessage("El rol es requerido"),
  handleValidationErrors,
];

export const validateProviderRequest = [
  body("name").notEmpty().withMessage("El nombre del proveedor es requerido"),
  body("phone")
    .notEmpty()
    .withMessage("El telefono del proveedor es requerido"),
  body("address")
    .notEmpty()
    .withMessage("La direccion del proveedor es requerida"),
  body("email").notEmpty().withMessage("El email del proveedor es requerido"),
  handleValidationErrors,
];

export const validateProductRequest = [
  body("code").notEmpty().withMessage("El codigo es requerido"),
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("category").notEmpty().withMessage("La categoria es requerida"),
  body("sale_price").notEmpty().withMessage("El precio de venta es requerido"),
  body("purchase_price")
    .notEmpty()
    .withMessage("El precio de compra es requerido"),
  body("stock").notEmpty().withMessage("El stock es requerido"),
  body("min_stock").notEmpty().withMessage("El stock minimo es requerido"),
  body("units").notEmpty().withMessage("La unidad es requerida"),
  body("provider").notEmpty().withMessage("El proveedor es requerido"),
  handleValidationErrors,
];

export const validatePurchaseRequest = [
  body("provider").notEmpty().withMessage("El proveedor es requerido"),
  body("products")
    .isArray()
    .withMessage("Los produtos deben ser un arreglo")
    .notEmpty()
    .withMessage("El arreglo de productos no puede estar vacio"),
  body("products.*.product_id")
    .notEmpty()
    .withMessage("El producto es requerido"),
  body("products.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es requerida"),
  body("products.*.price").notEmpty().withMessage("El precio es requerido"),
  body("products.*.subtotal")
    .notEmpty()
    .withMessage("El subtotal es requerido"),
  body("total").notEmpty().withMessage("El total es requerido"),
  body("date").notEmpty().withMessage("La fecha es requerida"),
  handleValidationErrors,
];

export const validateSaleRequest = [
  body("user").notEmpty().withMessage("El usuario es requerido"),
  body("products")
    .isArray()
    .withMessage("Los produtos deben ser un arreglo")
    .notEmpty()
    .withMessage("El arreglo de productos no puede estar vacio"),
  body("products.*.product_id")
    .notEmpty()
    .withMessage("El producto es requerido"),
  body("products.*.quantity")
    .notEmpty()
    .withMessage("La cantidad es requerida"),
  body("products.*.price").notEmpty().withMessage("El precio es requerido"),
  body("total").notEmpty().withMessage("El total es requerido"),
  body("payment").notEmpty().withMessage("El pago es requerido"),
  body("date").notEmpty().withMessage("La fecha es requerida"),
  handleValidationErrors,
];
