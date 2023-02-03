const mongoose = require("mongoose");
const db = process.env.DBURI;
exports.connectdb = () => {
  try {
    mongoose.connect(db, () => {
      console.log(`Connection Successfull`);
    });
  } catch (e) {
    console.log(e);
  }
};
