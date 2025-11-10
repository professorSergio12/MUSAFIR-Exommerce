import mongoose from "mongoose";
const foodOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A food option must have a name (e.g., Full Board)."],
    unique: true,
  },
  surchargePerDay: {
    type: Number,
    required: [true, "A food option must have a daily surcharge amount."],
    default: 0,
  },
  includesBreakfast: {
    type: Boolean,
    default: false,
  },
  includesLunch: {
    type: Boolean,
    default: false,
  },
  includesDinner: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: "",
  },
});

const FoodOption = mongoose.model("FoodOption", foodOptionSchema);
export default FoodOption;
