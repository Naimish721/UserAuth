const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("USER", userSchema);
module.exports = user;
