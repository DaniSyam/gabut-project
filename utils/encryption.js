const { createCipheriv, createDecipheriv } = require('crypto')

// Encrypt Data
const encrypt = (text, clientKey) => {
    try {
        const cipher = createCipheriv('aes256', Buffer.from(process.env.SERVER_KEY, "hex"), Buffer.from(clientKey, "hex"))
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    } catch (error) {
        return error.message
    } 
}

// Decrypt
const decrypt = (hash, clientKey) => {
    try {
        const decipher = createDecipheriv('aes256', Buffer.from(process.env.SERVER_KEY, "hex"), Buffer.from(clientKey, "hex"))
        return decipher.update(hash, 'hex', 'utf-8') + decipher.final('utf8')
    } catch (error) {
        return error.message
    }
}

module.exports = { encrypt, decrypt }