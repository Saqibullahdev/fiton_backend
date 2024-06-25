const mongoose = require('mongoose');
require('dotenv').config({path:"./../.env"});

const connectDB = async () => {
    console.log(process.env.DATABASE_URI);
    
        try {
            await mongoose.connect(process.env.DATABASE_URI)
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.warn('MongoDB connection error:', err.message);
        }
    };



mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});



process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

module.exports = connectDB;
