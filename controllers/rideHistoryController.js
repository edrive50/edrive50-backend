var RideHistory = require('../models/rideHistory');
var Driver = require('../models/driver');
var Rider = require('../models/rider');
var Request = require('../models/rideRequest')
var { DateTime } = require('luxon');

// POST //

exports.saveHistory = (req, res) => {
    // once ride is finished, It is saved to the driver's and rider's history, retrieved using id
    var ride_id = req.body.ride_id
    // var driver_id = req.body.driver_id
    // var date = new Date(req.body.ride_date)
    
    Request.findOne({ ride_id: ride_id }).exec((err, request) => {
        var driver_id = request.chosen_driver_id
        // console.log(request) .
        // return res.json({request.chosen_driver_id})
        Driver.findOne({ driver_id: driver_id }).exec((err, driver) => {
            var payment_info = {
                card_type: "Mastercard",
                trip_cost: 10.20
            }
            
            var rider_info = {
                payment_info: payment_info,
                start_adress: request.rider_info.start_address,
                end_address: request.rider_info.end_address
                
            }
            
            var time =  DateTime.local();
            
            var driver_payment_info = {
                trip_payment: 7.20
            }
           
            var rider_id = request.rider_id
          
            var driver_info = {
                rating: driver.rating,
                car_model: driver.car_details.model,
                car_make: driver.car_details.make,
                car_year: driver.car_details.year,
                payment_info: driver_payment_info
            }
            
            var rideHistory = new RideHistory({
                ride_id: ride_id, //yes
                ride_date: time, //yes
                rider_id: rider_id, //no
                driver_id: driver_id,
                rider_info: rider_info,
                driver_info: driver_info
            });
            
            return res.json(
                {
                    message: "Saved to ride history",
                    rideHistory
                }
            )
        });
    });
    
    
    
    
    
    // return res.json(
    //         {
    //             message: "Saved to ride history",
    //             rideHistory,
    //             value: rideHistory.ride_date.toUTCString()
    //         }
    //     )
    
    
    // rideHistory.save(function (err) {
    //     if (err) return res.send(err);

    //     res.json(
    //         {
    //             message: "Saved to ride history",
    //             rideHistory
    //         }
    //     )
    // });
}

// GET //

// FIX rider_name
exports.riderHistoryDetails = (req, res) => {
    // using id they can get their all ride history
    var rider_id = req.query.id; // riders id, my id
    // var payment_cost = 0.0;
    var driver_name = "";
    // var start_address =
    
    // get driver name
    
    
    // get history from ride history
    RideHistory.find({ "rider_id": rider_id }).exec((err, history) => {
        
        Driver.find({ "driver_id": history.driver_id }).exec((err, driver) => {
            driver_name = driver.name;
        });
        
        res.json({
            ride_date: history.ride_date,
            driver_name: driver_name,
            rider_info: history.rider_info,
            driver_info: history.driver_info,
            
        });
    });
    
    
}


/* FIX rider name*/
exports.driverHistoryDetails = (req, res) => {
    var rider_id = req.query.id;
    // var payment_cost = 0.0;
    var rider_name = "";
    // var start_address =
    
    
    
    // get history from ride history
    RideHistory.find({ "rider_id": rider_id }).exec((err, history) => {
         if (err) return res.send(err);
        
        Rider.find({ "rider_id": req.query.id }).exec((err, rider) => {
            if (err) return res.send(err);
        
            rider_name = rider.name;
        });
        
        
        res.json({
            ride_date: history.ride_date,
            driver_name: driver_name,
            rider_info: history.rider_info,
            driver_info: history.driver_info,
        });
    });
}


exports.retrieveAllHistoryRider = (req, res) => {
    var rider_id = req.query.id;
    RideHistory.find({ "rider_id": rider_id }).exec((err, history) => {
        if (err) return res.send(err);
        
        res.json({
            // ride_date: history.ride_date,
            // ride_id: history.ride_id,
            // end_address: history.rider_info.end_address
            history
        })
    });
}

exports.retrieveAllHistoryDriver = (req, res) => {
    var driver_id = req.query.id;
    RideHistory.find({ "driver_id": driver_id }).exec((err, history) => {
        if (err) return res.send(err);
        
        res.json({
            ride_date: history.ride_date,
            ride_id: history.ride_id,
            history
            // end_address: history.rider_info.end_address
        })
    });
}




