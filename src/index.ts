import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

mongoose
  .connect(process.env.DB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Base de datos conectada");
    console.log(process.env.DB_CONNECTION_STRING);
  })
  .catch((error) => {
    console.log(error);
    console.log("Error al conectarse a la base de datos");
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sale", saleRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.send("Hola mundo desde Express y TS");
});

app.listen(3000, () => {
  console.log("App corriendo en el puerto: 3000");
});
