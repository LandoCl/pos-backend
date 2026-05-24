import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE || "",
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL || "",
  tokenSigningAlg: "RS256",
});
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    console.log("jwtParse - Autorizacion denegada");
    return res.status(401).json({ message: "Autorizacion denegada" });
  }
  const token = authorization.split(" ")[1] as string;

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub as string;

    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.status(401).json({ message: "Autorizacion denegada: Usuario no registrado en la base de datos" });
    }
    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.status(401).json({ message: "Autorizacion denegada: Error en el parseo del token", error: error instanceof Error ? error.message : String(error) });
  }
};
