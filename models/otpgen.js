const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true,"otp already send,please check your email"]
    },
    code: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.model("otp", otpSchema, "otp");
module.exports = otp;
