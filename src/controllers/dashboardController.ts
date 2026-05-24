import { Request, Response } from "express";
import Sale from "../models/saleModel.js";
import Product from "../models/productModel.js";
import Provider from "../models/providerModel.js";

export const getDashboardStats = async (req: Request, res: Response): Promise<any> => {
  try {
    // 1. Calcular ventas del día (hoy)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const salesToday = await Sale.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const todaySales = salesToday.reduce((sum, sale) => sum + sale.total, 0);

    // 2. Contar productos bajos en stock (stock <= min_stock)
    const lowStockCount = await Product.countDocuments({
      $expr: { $lte: ["$stock", "$min_stock"] },
    });

    // 3. Contar proveedores activos (todos en la base de datos)
    const activeProviders = await Provider.countDocuments({});

    return res.status(200).json({
      todaySales,
      lowStockCount,
      activeProviders,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error);
    return res.status(500).json({ message: "Error al obtener estadísticas del dashboard" });
  }
};
