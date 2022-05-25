const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const { randomBytes } = require("crypto")
const { encrypt, decrypt } = require("../utils/encryption")
const path = require("path")
const { sendEmail } = require("../utils/nodemailer")

// @Desc    Sign In or Sign Up
// @Route   POST /api/user/auth
// @Access  Private | User
const userAuth = asyncHandler(async(req, res) => {
    const email = req.body.email
    // Check Email on Req Body
    if(!email) {
        res.status(400).json({ message: "Email Required!" })
    } else {
    // Check User on DB
        const user = await User.findOne({ email })
        // If Exists will Update
        if(user) {
            user.session = null
            user.verify_code = randomBytes(16).toString("hex")
            user.signin = false
            await user.save()
            // Send link to user email
            sendEmail(email, "Gabut Project Sign Verification", `<a href="${"http://localhost:5000/api/user/auth/" + user.verify_code}">Click to Sign In</a>`)
            res.status(201).sendFile(path.join(__dirname, "../views/Authentication.html"))
        } else {
        // If Not Exists will Create
            const user = await User.create({
                email,
                client_key: randomBytes(16).toString("hex"),
                session: null,
                verify_code: randomBytes(16).toString("hex"),
                signin: false
            })
            if(user) {
                // Send link to user email
                sendEmail(email, "Gabut Project Sign Verification", `<a href="${"http://localhost:5000/api/user/auth/" + user.verify_code}">Click to Sign In</a>`)
                res.status(201).sendFile(path.join(__dirname, "../views/Authentication.html"))
            } else {
                res.status(400)
                throw new Error("Failed to Create User")
            }
        }
    }
})

// @Desc    Authentication Link
// @Route   GET /api/user/auth/:id
// @Access  Private | User
const userVerify = asyncHandler(async(req, res) => {
    const verify_code = req.params.id
    const user = await User.findOne({ verify_code })
    if(user) {
        user.verify_code = null
        user.session = randomBytes(16).toString("hex")
        user.signin = true
        await user.save()
        res.cookie("access_token", `${encrypt(user.email, user.client_key)}.${encrypt(user.session, user.client_key) }.${user.client_key}`, {maxAge: 3600000 })
        res.redirect("/dashboard")
    } else {
        res.status(404).json({ message: "Something Went Wrong, links are only used once." })
    }
})

// @Desc    User Sign Out
// @Route   POST /api/user/signout
// @Access  Private | User
const userSignout = asyncHandler(async(req, res) => {
    const access_token = req.cookies.access_token.split(".")
    const email = decrypt(access_token[0], access_token[2])
    const user = await User.findOne({ email })
    if(user) {
        user.session = null
        user.verify_code = null
        user.signin = false
        await user.save()
        res.clearCookie("access_token")
        res.status(200).send("sign out")
    } else {
        res.status(400).json({ message: "Something Went Wrong" })
    }
})

// @Desc    Send Delete Link to Email
// @Route   DELETE /api/user/delete
// @Access  Private | User
const userDelete = asyncHandler(async(req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email })
    if(user) {
        user.delete_code = randomBytes(32).toString("hex")
        await user.save()
        // Send Delete Link to User Email
        res.status(200).json({ message: "Confirmation link has been sent to your email" })
    } else {
        res.status(404).json({ message: "User Not Found"})
    }
})

// @Desc    Confirmation Deleting User from DB
// @Route   DELETE /api/user/delete/:id
// @Access  Private | User
const userVerifyDelete = asyncHandler(async(req, res) => {
    const delete_code = req.params.id
    const user = await User.findOne({ delete_code })
    if(user) {
        user.remove()
        res.status(200).json({ message: "Success Remove User" })
    } else {
        res.status(404).json({ message: "Something Went Wrong"})
    }
})

module.exports = { userAuth, userVerify, userSignout, userDelete, userVerifyDelete}