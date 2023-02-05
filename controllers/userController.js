const Customs = require("../models/user");
const bcrypt = require("bcryptjs");
const Otp = require("../models/otpgen");
const nodemailer = require("nodemailer");

exports.userList = async (req, res) => {
  const data = await Customs.find();
  res.send(data);
};

exports.userAdd = async (req, res) => {
  try {
    // console.log(req.body);
    const data = new Customs(req.body);
    await data.save();
    // let myToken = await data.getAuthToken();
    // res.status(200).send({ message: "ok", token: myToken });
    res.status(200).send({ message: "ok", message: "You are registered" });
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
  try {
    const user = await Customs.findOne({ email: req.body.email });
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
        console.log("Success");
      } else {
        res.status(301).send({
          message: "Please enter correct password",
        });
        console.log("password error");
      }
    } else {
      res.status(301).send({
        message: "Please enter registered email id and password",
      });
      console.log("password and email error");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.emailSend = async (req, res) => {
  const data = await Customs.findOne({ email: req.body.email });
  const response = {};
  if (data) {
    const check = await Otp.findOne({email:req.body.email});
    if(check)
    {
      mailer(req.body.email, check.code);
      response.statusText = "Success";
      response.message = "Please check your email";
    }
    else
    {
      const otpcode = Math.floor(Math.random() * 10000 + 1);
      const otpdata = Otp({
      email: req.body.email,
      code: otpcode,
    });
      await otpdata.save();
      mailer(req.body.email, otpcode);
      response.statusText = "Success";
      response.message = "Please check your email";
    }
  } else {
    response.statusText = "error";
    response.message = "Email not registered";
  }
  res.send(response);
};

const mailer = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "21cse452.naimishkumarsahu@giet.edu",
      pass: "asdfghjkl452",
    },
  });

  const info = await transporter.sendMail({
    from: "21cse452.naimishkumarsahu@giet.edu",
    to: email,
    subject: "test",
    text: "Your otp is " + otp,
  });
  console.log(info.messageId);
};

exports.otpVerify = async (req, res) => {
  const data = await Otp.find({
    email: req.body.email,
    code: req.body.otpcode,
  });
  const response = {};
  if (data) {
    response.statusText = "Success";
  } else {
    response.statusText = "error";
    response.message = "Invalid otp";
  }
  res.send(response);
};
