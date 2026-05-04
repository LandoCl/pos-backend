import { Request, Response } from "express";
import Purchase from "../models/purchaseModel.js";
import Product from "../models/productModel.js";

export const getPurchases = async (req: Request, res: Response): Promise<any> => {
  try {
    const { startDate, endDate, providerId } = req.query;
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

    if (providerId) {
      query.provider = providerId;
    }

    const purchases = await Purchase.find(query).sort({ date: -1 });
    return res.status(200).json({ purchases });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener las compras" });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { provider, products, total } = req.body;

    const newPurchase = new Purchase({
      provider,
      products,
      total,
    });
    await newPurchase.save();

    for (const item of products) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: item.quantity },
      });
    }
    return res.status(201).json(newPurchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar la compra" });
  }
};
