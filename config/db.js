const mongoose = require("mongoose");
exports.connectdb = () => {
  try {
    mongoose.connect(process.env.DBURI, () => {
      console.log(`Connection Successfull`);
    });
  } catch (e) {
    console.log(e);
  }
};
