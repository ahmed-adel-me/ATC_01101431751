import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String, // Optional, store URL or file path
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
