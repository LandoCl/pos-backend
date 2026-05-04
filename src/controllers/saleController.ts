import { Request, Response } from "express";
import Sale from "../models/saleModel.js";
import Product from "../models/productModel.js";

export const getSales = async (req: Request, res: Response): Promise<any> => {
  try {
    const { startDate, endDate, userId } = req.query;
    let query: any = {};

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate as string);
      }
      if (endDate) {
        const end = new Date(endDate as string);
        end.setUTCHours(23, 59, 59, 999);
        query.date.$lte = end;
      }
    }

    if (userId) {
      query.user = userId;
    }

    const sales = await Sale.find(query).sort({ date: -1 });
    return res.status(200).json({ sales });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener las ventas" });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    const { products, total, payment } = req.body;
    const userId = req.userId;

    for (const item of products) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(401).json({ message: "Producto no encontrado" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para el producto: ${product.name}. Disponible: ${product.stock}`,
        });
      }
    }

    const newSale = new Sale({
      user: userId,
      products,
      total,
      payment,
    });
    await newSale.save();
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: -item.quantity },
      });
    }
    return res.status(201).json({ message: "Venta creada exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear la venta" });
  }
};
