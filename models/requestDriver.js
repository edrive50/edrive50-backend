var mongoose = require('mongoose');

const requestDriverSchema = new mongoose.Schema({
    name: String,
    is_available: Boolean,
    driver_id: String,
    phone_number: String,
    image: String,
    rating: Number,
    car_details: {
        model: String,
        make: String,
        colour: String,
        photo: String,
        licence_plate: String,
        accessibility_options: {
            wheelchair: Boolean,
            walker: Boolean,
            other_details: String,
            car_type: String
        }
    },
    location: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('requestDrivers', requestDriverSchema);
