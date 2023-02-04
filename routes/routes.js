const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/add", userController.userAdd);
router.get("/list", userController.userList);

router.post("/login",userController.userLogin)

module.exports = router;
