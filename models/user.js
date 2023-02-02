const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },
  {
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  }
);

userSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
userSchema.methods.getAuthToken = async (data) => {
  let params = {
    id: this._id,
    email: this.email,
    phone: this.phone,
  };
  var tokenValue = jwt.sign(params, process.env.SECREATKEY);
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};
const user = mongoose.model("USER", userSchema);
module.exports = user;
