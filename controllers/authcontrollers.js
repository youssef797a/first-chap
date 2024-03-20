const  mongoose  = require("mongoose")

const User = require("../model/usermodel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../config/.env"})
//register user



exports.registeurUser = async (req, res) => {
  const { name, lastName,email, password} = req.body
  try {
    if(!name || !lastName || !email || !password){
        return res.status(400).send({msg: "please entre all filds"})

    }
    
    let user = await User.findOne({email})
    if (user) {
        return res.status(400).send({msg: "user already exists"})

    }
    //create new user
    user = new User({name, lastName, email, password})
    //hash
    const saltRounds = 10;
    const hashedPassowrd = await  bcrypt.hash(password, saltRounds)
    user.password = hashedPassowrd

    //save user
    await user.save()

    res.status(201).send({msg: "User regestred", user})
  } catch (error) {
    res.status(500).send({msg: "Regester server erorr"})
    console.log(error);
  }

}
//login user
exports.loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    if(!email || !password) {
      return res.status(400).send({msg: "please entre all filds"})
    }
    let user = await User.findOne({email})
    if (!user) {
        return res.status(400).send({msg: "bad credendtials"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      return res.status(400).send({msg: "bad credendtials 211"})
    }
    //sign user
    const payload = {id: user._id}
    const token = jwt.sign(payload, process.env.secretOrPrivatekey, {expiresIn: 36000})


    res.status(200).send({msg: "User logged in", user, token})
  } catch (error) {
    res.status(500).send({msg: "login server erorr"})
    console.log(error);
  }
}
//get auth user
exports.getAuthUser = (req, res) => {
  res.status(200).send({user: req.user})
}