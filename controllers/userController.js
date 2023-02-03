const Users = require("../models/user");

exports.userList = async (req, res) => {
  const data = await Users.find();
  res.send(data);
};

exports.userAdd = async (req, res) => {
  try {
    // console.log(req.body);
    const data = new Users(req.body);
    await data.save();
    let myToken = await data.getAuthToken();
    res.status(200).send({message:'ok',token:myToken});
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
};
