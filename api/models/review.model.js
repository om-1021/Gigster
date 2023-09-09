import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    communication: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    qualityOfWork: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    deliveryTime: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
