import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 6);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong password or username"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    console.log("created token is -->", token);
    const { password, ...info } = user._doc;
    res.status(200).send({ ...info, accessToken: token });

    console.log("aceestoken stored successfully");
    console.log("info is -->", info);
  } catch (err) {
    res.status(500).send({ message: "cant store jwt token in cookies" });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .send("User has been logged out successfully;");
  } catch (err) {
    next(err);
  }
};
