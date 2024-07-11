const mongoose = require('mongoose');

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
        await mongoose.connect(dbUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;