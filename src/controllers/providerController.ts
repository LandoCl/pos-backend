import { Request, Response } from "express";
import Provider from "../models/providerModel.js";

export const getProvider = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const providers = await Provider.find({});

    return res.status(200).json({
      providers,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al obtener los proveedores" });
  }
};

export const createProvider = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const { code, name, phone, email, address } = req.body;
    const existingProvider = await Provider.findOne({ code });

    if (existingProvider) {
      return res.status(200).json({ message: "Proveedor duplicado" });
    }

    const newProvider = new Provider({
      code,
      name,
      phone,
      email,
      address,
    });

    await newProvider.save();

    return res.status(201).json({
      message: "Proveedor creado exitosamente",
      provider: newProvider,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el proveedor" });
  }
};

export const updateProvider = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const id = req.params.id;
    const { name, phone, email, address } = req.body;
    const existingProvider = await Provider.findById(id);

    if (!existingProvider) {
      return res.status(401).json({ message: "Proveedor no encontrado" });
    }

    existingProvider.name = name;
    existingProvider.phone = phone;
    existingProvider.email = email;
    existingProvider.address = address;

    await existingProvider.save();

    return res.status(200).json({
      message: "Proveedor actualizado exitosamente",
      provider: existingProvider,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error al actualizar el proveedor" });
  }
};
