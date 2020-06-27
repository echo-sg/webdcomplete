// const mongoose = require("mongoose");
// const Schema = mongoose.schema;

// var serviceSchema = new Schema({
//     serviceName: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var serviceSchema = new Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Services = mongoose.model('Service', serviceSchema);

module.exports = Services;
