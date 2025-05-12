import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// prevent duplicate booking
bookingSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
