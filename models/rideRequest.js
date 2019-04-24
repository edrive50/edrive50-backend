var mongoose = require('mongoose');
var { DateTime } = require('luxon');

const rideRequestSchema = new mongoose.Schema({
    ride_id: String,
    rider_id: String,
    chosen_driver_id: String,
    ride_status: String,
    ride_time: Number,
    rider_info: {
        rider_name: String,
        rider_image: String,
        start_address: {
            street_num: String,
            street: String,
            city: String,
            prov: String,
            postal_code: String,
            latitude: Number,
            longitude: Number
        },
        end_address: {
            street_num: String,
            street: String,
            city: String,
            prov: String,
            postal_code: String,
            latitude: Number,
            longitude: Number
        },
        accessibility_options: {
            wheelchair: Boolean,
            physical_assistance: Boolean,
            big_trunk: Boolean,
            other_details: String
        }
    }
});

module.exports = mongoose.model('rideRequests', rideRequestSchema);