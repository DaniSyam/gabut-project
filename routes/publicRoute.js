const express = require("express")
const router = express.Router()
const { landingPage, dashboard } = require("../controllers/publicController")

router.route("/").get(landingPage)
router.route("/dashboard").get(dashboard)

module.exports = router