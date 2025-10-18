const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect("mongodb+srv://shudhanshukumar9713_db_user:cJBkrlYs6J37xiyr@cluster0.lp3hje4.mongodb.net/Cohort")
    .then(() => {
        console.log('Connected to DB');
    })
}

module.exports = connectToDB;