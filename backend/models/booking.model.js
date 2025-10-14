import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A booking must belong to a User."],
    },
    package: {
      type: mongoose.Schema.ObjectId,
      ref: "Package",
      required: [true, "A booking must be for a Package."],
    },
    travelDate: {
      type: Date,
      required: [true, "Please provide the start date of the trip."],
    },
    travelersCount: {
      type: Number,
      required: [true, "Please specify the number of travelers."],
      min: 1,
    },
    // Customization selections
    selectedHotel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
      required: [true, "A hotel selection is required."],
    },
    selectedRoomType: {
      type: String, // Stored as string (e.g., 'Deluxe', 'Suite')
      required: true,
    },
    selectedFoodOption: {
      type: mongoose.Schema.ObjectId,
      ref: "FoodOption",
    },
    // Payment and Status
    totalAmount: {
      type: Number,
      required: [true, "Booking must have a total amount."],
    },
    bookingType: {
      type: String,
      enum: ["pay_advance", "normal_booking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "deposit_paid", "paid_full"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["confirmed", "pending_admin", "cancelled"],
      default: "pending_admin",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
