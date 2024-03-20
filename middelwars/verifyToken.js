const jwt = require("jsonwebtoken")
require("dotenv").config({path: "../config/.env"})
const User = require("../model/usermodel")

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"]
        if (!token) {
            return res.status(400).send({msg: "error token"})
        }
        //get user from paylaod
        const decoded = jwt.verify(token, process.env.secretOrPrivateKey) 
        const user =  await User.findById(decoded.id)
        if (!user) { 
            return res.status(400).send({msg: "unauthaurized!"})

        }
      // console.log(decoded);
        req.user = user 
        next()
    } catch (error) {
        res.status(500).send({msg: "error while validating token"})
    }
}
module.exports = verifyToken