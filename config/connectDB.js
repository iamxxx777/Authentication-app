import mongoose from 'mongoose';
const db = process.env.DATABASE_URL;


const connectDB = async () => {
    try {
        await mongoose.connect(db);

        console.log('Mongoose is connected...');
    } catch (error) {
            console.error(error);
            process.exit(1);
    }
}

module.exports = connectDB;