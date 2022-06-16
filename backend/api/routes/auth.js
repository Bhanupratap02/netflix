/** @format */

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.email,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
   if(!req.body.email && !req.body.password){
     return res.status(401).send("Please provide an email and password")
   }
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).send("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
     
    if (originalPassword !== req.body.password)
    return res.status(401).json("Wrong password or username!");
    
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = user._doc;

    return res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
module.exports = router;