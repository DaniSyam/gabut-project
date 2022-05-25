const express = require("express")
const router = express.Router()
const { userAuth, userVerify, userSignout, userDelete, userVerifyDelete } = require("../controllers/apiController")

// For Sign In or Sign Up User
router.route("/user/auth").post(userAuth)

// For Authentication Link User
router.route("/user/auth/:id").get(userVerify)

// For Sign Out User
router.route("/user/signout").post(userSignout)

// For Delete User
router.route("/user/delete").delete(userDelete)

// For Authentication Deleting User
router.route("/user/delete/:id").delete(userVerifyDelete)

module.exports = router