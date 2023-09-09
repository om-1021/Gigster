import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account"));
  } else {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully");
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
    console.log("acessToken from getUser is ",token);
  }

  res.status(200).send(user);
};
