const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Conntected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    })
}

module.exports = connectDB;