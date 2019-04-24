var mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    account_status: String,
    is_available: Boolean,
    driver_id: String,
    phone_number: String,
    image: String,
    rating: Number,
    user_description: String,
    car_details: {
        model: String,
        make: String,
        colour: String,
        car_type: String,
        year: String,
        registrations_details: {
            registered_name: String,
            licence_plate: String,
            vin: String
        },
        accessibility_options: {
            wheelchair: Boolean,
            physical_assistance: Boolean,
            big_truck: Boolean,
            other_details: Boolean
        }
    }
});

module.exports = mongoose.model('driver', driverSchema);