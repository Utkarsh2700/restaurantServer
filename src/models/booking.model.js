import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  date: String,
  time: String,
  guests: Number,
  name: String,
  contact: String,
});

export const Booking = mongoose.model("Booking", bookingSchema);
