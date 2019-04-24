var mongoose = require('mongoose');

const requestRiderSchema = new mongoose.Schema({
    id: String,
    name: String,
    ride_id: String,
    image: String,
    start_adress: {
        str_num: String,
        street: String,
        city: String,
        postal_code: String,
        latitude: String,
        longitude: String
    },
    end_address: {
        str_num: String,
        street: String,
        city: String,
        postal_code: String,
        latitude: String,
        longitude: String
    },
    accessibility_options: {
        wheelchair: Boolean,
        walker: Boolean,
        other_details: String
    }
});

module.exports = mongoose.model('requestRiders', requestRiderSchema);
