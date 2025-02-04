const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

const dbconnect = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('database connected');
        }).catch((error) => {
            console.log("Error : ", error)
        })
}

module.exports = dbconnect;