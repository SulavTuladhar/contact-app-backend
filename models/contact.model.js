const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phoneNumber: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true
})
module.exports = mongoose.model('contact', contactSchema);