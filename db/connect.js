const mongoose = require("mongoose");

const connectToDB = (url) => {
    return mongoose.connect(url)
        .then(() => console.log('Connected to DB'))
        .then((err) => console.log(err))
}

module.exports = connectToDB;