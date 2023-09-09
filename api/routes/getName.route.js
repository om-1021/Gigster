import express from "express";
import User from "../models/user.model.js"; // Import your User model

const router = express.Router();

router.get("/getName/:buyerId", async (req, res) => {
  const buyerId = req.params.buyerId;
  console.log(buyerId);

  try {
    const buyer = await User.findById(buyerId); // Use `buyerId` directly
    if (buyer) {
      res.status(200).send(buyer.username);
    } else {
      res.status(404).json({ message: "Buyer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
