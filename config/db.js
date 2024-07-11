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

    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected');
    });

    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    } catch (error) {
        console.error('MongoDB initial connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;