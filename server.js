const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})
const taskRouter = require("./routes/taskRouter")
const authRouter = require("./routes/authRoutes")

const app = express()
connectDB()

app.use(express.json())
//routes
app.use("/api/tasks", taskRouter)
app.use("/api/auth", authRouter)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});