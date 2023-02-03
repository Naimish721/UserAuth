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
    token: [
      {
        tokens: {
          type: String,
          require: true,
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
userSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this._id,
    email: this.email,
    phone: this.phone,
  };
  var tokenValue = jwt.sign(params, process.env.SECREATKEY);
  // console.log(tokenValue);
  this.tokens = this.tokens.concat(tokenValue);
  // console.log(this.tokens);
  await this.save();
  return tokenValue;
};
const user = mongoose.model("USER", userSchema);
module.exports = user;
