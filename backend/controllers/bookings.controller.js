import bookingModel from "../models/booking.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createBooking = async (req, res, next) => {
  const {
    packageId,
    userId,
    travelDate,
    travelersCount,
    selectedHotel,
    selectedRoomType,
    selectedFoodOption,
    totalAmount,
    bookingType,
    paymentStatus,
    bookingStatus,
  } = req.body;
  try {
    const newBooking = new bookingModel({
      packageId,
      userId,
      travelDate,
      travelersCount,
      selectedHotel,
      selectedRoomType,
      selectedFoodOption,
      totalAmount,
      bookingType,
      paymentStatus,
      bookingStatus,
    });
    await newBooking.save();
    res.status(201).json({ status: "success", data: newBooking });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

//Admin Routes
export const getAllBookings = async (req, res, next) => {
    if(!req.user.isAdmin) {
        return next(errorHandler(401, "Unauthorized"));
    }
  try {
    const bookings = await bookingModel.find();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};
