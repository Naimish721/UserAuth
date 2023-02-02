const Users = require("../models/user");

exports.userList = async (req, res) => {
  const data = await Users.find();
  res.send(data);
};

exports.userAdd = async (req, res) => {
  try {
    // console.log(req.body);
    const data = await Users.create(req.body);
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
    // console.log(e);
  }
};
