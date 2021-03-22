const mongoose = require('mongoose');
// const config = require('config');
const { mongoURI } = require('./default.json');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected!');
    } catch (err) {
        console.error(err.message);
        // Exit process upon failure
        process.exit(1);
    }
};

module.exports = connectDB;
