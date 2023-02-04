const Users = require("../models/user");
const bcrypt = require("bcryptjs");

exports.userList = async (req, res) => {
  const data = await Users.find();
  res.send(data);
};

exports.userAdd = async (req, res) => {
  try {
    // console.log(req.body);
    const data = new Users(req.body);
    await data.save();
    // let myToken = await data.getAuthToken();
    // res.status(200).send({ message: "ok", token: myToken });
    res.status(200).send({ message: "ok" });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};

exports.userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(301).send({
      message: "Please enter email id or password",
    });
  }
  // console.log(req.body);

  const user = await Users.findOne({ email: req.body.email });
  if (user) {
    // console.log(user);
    // console.log(user.password);
    // console.log(req.body.password);
    const match = await bcrypt.compare(req.body.password, user.password);
    // console.log(match);
    if (match) {
      res.status(200).send({
        message: "Login Successfull",
      });
    } else {
      res.status(301).send({
        message: "Please enter correct password",
      });
      console.log("pass error");
    }
  } else {
    res.status(301).send({
      message: "Please enter registered email id and password",
    });
    console.log("pass and email error");
  }
};
