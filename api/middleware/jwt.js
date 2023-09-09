import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
    console.log("acessToken ",token);
  }
  // if (!token) return next(createError(401, "You are not authenticated"));
  if (!req.token) {
    return next(createError(401, "you are not authenticated"));
  }

  jwt.verify(req.token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    next();
  });
};
