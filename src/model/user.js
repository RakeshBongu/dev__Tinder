const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})

userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DevTinder@Rakesh")
    return token;
}


module.exports = mongoose.model('User', userSchema);