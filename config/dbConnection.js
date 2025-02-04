const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/secondDb"

const dbconnect = () => {
    mongoose.connect(url)
        .then(() => {
            console.log('database connected');
        }).catch((error) => {
            console.log("Error : ", error)
        })
}

module.exports = dbconnect;