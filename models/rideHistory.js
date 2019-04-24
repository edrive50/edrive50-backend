var mongoose = require('mongoose');


const rideHistorySchema = new mongoose.Schema({
    ride_id: String,
    rider_id: String,
    driver_id: String,
    ride_date: Date,
    rider_info: {
        payment_info: {
          card_type: String,
          trip_cost: Number
        },
        start_adress: {
            street: String,
            city: String,
            postal_code: String,
            latitude: String,
            longitude: String
        },
        end_address: {
            street: String,
            city: String,
            postal_code: String,
            latitude: String,
            longitude: String
        }
    },
    driver_info: {
        rating: Number,
        car_model: String,
        car_make: String,
        car_year: String,
        payment_info: {
          trip_payment: Number
        }
    }
});




/*
ride_date: String,
rider_info: {
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
    }
},
driver_info: {
    driver_name: String,
    rating: Number,
    car_model: String,
    car_make: String,
    payment_info: {
      trip_payment: Number
    }
}

*/

module.exports = mongoose.model('rideHistory', rideHistorySchema);