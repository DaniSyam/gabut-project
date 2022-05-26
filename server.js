const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const logger = require("./utils/logger")
const apiRoute = require("./routes/apiRoute")
const publicRoute = require("./routes/publicRoute")
require("dotenv/config")

const app = express()
const PORT = process.env.PORT || 5000

// Connect to DB
connectDB()

// Middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger)

// Static Page
app.use("/static", express.static("static"))

// Routes Public
app.use("/", publicRoute)

// Routes API
app.use("/api", apiRoute)

// Not Found Handler
app.use((req, res, next) => {
  res.status(404).send("Not Found")
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
