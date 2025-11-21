import bookingModel from "../models/booking.model.js";

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

// Get current user's bookings
export const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel
      .find({ user: req.user._id })
      .populate("packageId", "name images basePrice durationDays country slug")
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};
