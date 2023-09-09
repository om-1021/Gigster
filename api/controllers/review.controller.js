import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));

  try {
    const gigId = req.body.gigId;
    const userId = req.userId;

    // Fetch the gig and the order related to the gig and user
    const [gig, order] = await Promise.all([
      Gig.findById(gigId),
      Order.findOne({ gigId, buyerId: userId, isCompleted: true }),
    ]);

    if (!gig)
      return next(createError(404, "Gig not found!"));

    if (!order)
      return next(createError(403, "You need to purchase the gig to leave a review."));

    const newReview = new Review({
      userId,
      gigId,
      desc: req.body.desc,
      communication: req.body.communication,
      qualityOfWork: req.body.qualityOfWork,
      deliveryTime: req.body.deliveryTime,
    });

    const existingReview = await Review.findOne({ gigId, userId });

    if (existingReview)
      return next(createError(403, "You have already created a review for this gig!"));

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        totalStars: (req.body.communication + req.body.qualityOfWork + req.body.deliveryTime),
        starNumber: 3,
      },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
