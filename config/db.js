const mongoose = require('mongoose');
require('dotenv').config();
/**
 * Connects to the MongoDB database.
 * @async
 * @function connectDB
 * @throws {Error} If there is an error connecting to the database.
 * @returns {Promise<void>} A promise that resolves when the database connection is successful.
 */
async function connectDB() {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
        console.error('MongoDB connection error: MONGO_URI is not defined in .env');
        process.exit(1);
    }

    try {
        // dont change here if necessary to use the parse option 
        await mongoose.connect(dbUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
// this config works with deployed version of mongodb "currently using atlas"
}

module.exports = connectDB;