const path = require("path")

// @Desc    Send Views Landing Page
// @Route   GET /
// @Access  Public
const landingPage = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/landingPage.html"))
}

// @Desc    Send Views Dashboard
// @Route   GET /dashboard
// @Access  Private | User
const dashboard = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../views/dashboard.html"))
}

module.exports = { landingPage, dashboard }