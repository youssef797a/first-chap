const router = require("express").Router()
const controllers = require("../controllers/authcontrollers")

const verifyToken = require("../middelwars/verifyToken")

router.get("/hello", (req, res) => {
    res.send("hello Auth")
})
//register
router.post("/register", controllers.registeurUser)

//login
router.post("/login", controllers.loginUser)

//privet route
router.get("/user", verifyToken, controllers.getAuthUser)


module.exports = router