// models/Drugstore.js
const mongoose = require('mongoose');

const drugstoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
    openSlots: [
        {
            from: Date,
            to: Date,
        },
    ],
    profilePicture: {
        type: String,
    },
});

const Drugstore = mongoose.model('Drugstore', drugstoreSchema);

module.exports = Drugstore;
