const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect('mongodb+srv://Rakesh:Rakesh%40123@nodepractice.bwy2r7g.mongodb.net/devTinder')
}

module.exports = {
    connectDb
}