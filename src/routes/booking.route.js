import { Router } from "express";
import {
  checkAvailability,
  createBooking,
  deleteBooking,
  fetchBooking,
} from "../controllers/booking.controller.js";

const router = Router();

router.route("/create-booking").post(createBooking);
router.route("/get-availability").post(checkAvailability);
router.route("/delete-booking/:id").delete(deleteBooking);
router.route("/status/:id").get(fetchBooking);

export default router;
