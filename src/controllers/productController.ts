import { Request, Response } from "express";
import Product from "../models/productModel.js";

export const getProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const {
      code,
      name,
      category,
      sale_price,
      purchase_price,
      stock,
      min_stock,
      units,
      provider,
    } = req.body;
    const existingProduct = await Product.findOne({ code });

    if (existingProduct) {
      return res.status(200).json({ message: "Producto duplicado" });
    }

    const newProduct = new Product({
      code,
      name,
      category,
      sale_price,
      purchase_price,
      stock,
      min_stock,
      units,
      provider,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const id = req.params.id;
    const {
      code,
      name,
      category,
      sale_price,
      purchase_price,
      stock,
      min_stock,
      units,
      provider,
    } = req.body;
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(401).json({ message: "Producto no encontrado" });
    }

    existingProduct.code = code;
    existingProduct.name = name;
    existingProduct.category = category;
    existingProduct.sale_price = sale_price;
    existingProduct.purchase_price = purchase_price;
    existingProduct.stock = stock;
    existingProduct.min_stock = min_stock;
    existingProduct.units = units;
    existingProduct.provider = provider;

    await existingProduct.save();

    return res.status(200).json({
      message: "Producto actualizado exitosamente",
      product: existingProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el producto" });
  }
};
