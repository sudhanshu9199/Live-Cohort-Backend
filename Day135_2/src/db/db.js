const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('DB coonnected')
    })
    .catch(err => {
        console.log('MongoDB connected failed!: ', err);
        
    })
}

module.exports = connectToDB;