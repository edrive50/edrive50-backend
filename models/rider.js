var mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    name: String,
    rider_id: String,
    email: String,
    password: String,
    phone_number: String,
    image: String,
    emergency_contact_details: {
        emergency_name: String,
        emergency_number: String
    },
    accessibility_options: {
        wheelchair: Boolean,
        physical_assistance: Boolean,
        big_truck: Boolean,
        other_details: String
    },
    payment_info: {
        card_type: String,
        expiry_date: String,
        cvv: Number,
        cardholder_name: String
    }
});

module.exports = mongoose.model('riders', riderSchema);