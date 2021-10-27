import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        default: 'John Doe'
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/iamxxx777/image/upload/v1626707838/hlwtoipgbjgim8pdelgr.jpg",
    },
    cloudId: {
        type: String,
    },
    phone: {
        type: Number,
    },
    bio: {
        type: String,
    }
}, {timestamps: true});



module.exports = mongoose.models.Users || mongoose.model('Users', userSchema);