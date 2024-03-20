const express = require("express")
const router = express.Router()
const controllers = require("../controllers/control")


router.get("/hello", (req, res) => {
    res.send("hello contact routing")
})

router.post("/", controllers.posttask)

router.post("/", controllers.getALLtasks)

router.get("/:id", controllers.getoncetasks)

router.delete("/:id", controllers.deletetasks)

router.put("/:id", controllers.updatetasks)


module.exports = router