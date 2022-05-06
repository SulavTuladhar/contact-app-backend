const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String
    },
    photo: {
        type: String
    }
},{
    timestamps: true
})
module.exports = mongoose.model('user', UserSchema);