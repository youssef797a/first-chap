const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})
const index = require("./routes/index")

const app = express()
connectDB()


//routes
app.use("/api/tasks", index)

const PORT = process.env.PORT

app.listen(PORT,err => {
    err ? console.log(err)
        : console.log("server is runnig on port " + PORT);
})