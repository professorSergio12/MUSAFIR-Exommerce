import instance from "../config/payment.js";

export const createOrder = async (req, res, next) => {
  const { amount } = req.body;
  try {
    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "USD",
    });
    res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (error) {
    next(error);
  }
};
