const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        client_key: { type: String, required: true, unique: true },
        session: { type: String, default: null, unique: true },
        verify_code: { type: String, default: null, unique: true },
        signin: { type: Boolean, default: false },
        delete_code: { type: String, default: null, unique: true }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)