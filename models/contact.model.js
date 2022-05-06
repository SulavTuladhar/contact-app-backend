const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        lowercase: true,
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
module.exports = mongoose.model('contact', contactSchema);