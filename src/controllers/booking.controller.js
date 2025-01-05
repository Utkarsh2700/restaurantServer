import { Booking } from "../models/booking.model.js";

const createBooking = async (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking)
      return res.status(400).json({ message: "Time Slot already Booked" });
    const newBooking = new Booking({ date, time, guests, name, contact });
    const confirmedBooking = await newBooking.save();
    res.status(201).json(confirmedBooking);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating booking", error: error.message });
  }
};

const fetchBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  return res.status(200).json({
    booking,
  });
};

const checkAvailability = async (req, res) => {
  try {
    const { date } = req.body;
    const bookedSlots = await Booking.find({ date }).select("time -_id");
    const allSlots = [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];
    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.some((b) => b.time === slot)
    );
    if (availableSlots.includes(date)) {
      return res.json({ slots: availableSlots });
    }
    res.json({ slots: availableSlots });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching availability", error: err.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking Cancelled Successfully", deletedBooking });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};

export { checkAvailability, createBooking, deleteBooking, fetchBooking };
