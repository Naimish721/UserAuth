const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECREATKEY = process.env.SECREATKEY;

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

userSchema.methods.getAuthToken = async function (data) {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, SECREATKEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (e) {
    console.log(e);
  }
};
userSchema.pre("save", function (next) {
  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const user = mongoose.model("USER", userSchema);
module.exports = user;
