import { Request, Response } from "express";
import User from "../models/userModel.js";
import { ManagementClient, AuthenticationClient } from "auth0";
import crypto from "crypto";

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, username, name, rol } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const domain = process.env
      .AUTH0_ISSUER_BASE_URL!.replace("https://", "")
      .replace("/", "");
    const management = new ManagementClient({
      domain: domain,
      clientId: process.env.AUTH0_M2M_CLIENT_ID!,
      clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
    });

    const auth = new AuthenticationClient({
      domain: domain,
      clientId: process.env.AUTH0_M2M_CLIENT_ID!,
      clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
    });

    const randomPassword = crypto.randomBytes(16).toString("hex") + "A1!";

    const auth0UserResponse = await management.users.create({
      connection: "Username-Password-Authentication",
      email: email,
      password: randomPassword,
      name: name || username,
      nickname: username,
      username: username,
    });

    const auth0Id = auth0UserResponse.data.user_id;

    await auth.database.changePassword({
      email: email,
      connection: "Username-Password-Authentication",
    });

    const newUser = new User({
      auth0Id,
      email,
      username,
      name,
      rol: rol || "Cajero",
    });
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, username, rol } = req.body;
    //Obtenemos los datos del usuario que inicio sesion
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user!.name = name;
    user!.username = username;
    user!.rol = rol;
    //Guardamos el usuario en la base de datos
    await user.save();
    res.send(user); //Enviamos al frontend los datos del usuario guardado
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const updateUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, username, rol } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.name = name;
    user.username = username;
    if (rol) user.rol = rol;
    await user.save();

    if (user.auth0Id) {
      const domain = process.env.AUTH0_ISSUER_BASE_URL!.replace("https://", "").replace("/", "");
      const management = new ManagementClient({
        domain: domain,
        clientId: process.env.AUTH0_M2M_CLIENT_ID!,
        clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
      });
      try {
        await management.users.update({ id: user.auth0Id }, { name, nickname: username, username });
      } catch(e) {
        console.log("Auth0 update error:", e);
      }
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.auth0Id) {
      const domain = process.env.AUTH0_ISSUER_BASE_URL!.replace("https://", "").replace("/", "");
      const management = new ManagementClient({
        domain: domain,
        clientId: process.env.AUTH0_M2M_CLIENT_ID!,
        clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET!,
      });
      try {
        await management.users.delete({ id: user.auth0Id });
      } catch(e) {
        console.log("Auth0 delete error:", e);
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
