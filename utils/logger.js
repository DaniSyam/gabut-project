const { decrypt } = require("./encryption")

const logger = (req, res , next) => {
    let email;
    if(req.cookies.access_token) {
        const access_token = req.cookies.access_token.split(".")
        email = decrypt(access_token[0], access_token[2])
    }
    console.log(`${req.cookies.access_token ? email : "anonymous"} | ${req.ip.split(":")[req.ip.split(":").length - 1]} | ${req.method} | ${req.url}`)
    next()
}

module.exports = logger