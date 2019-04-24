// var Driver = require('../models/requestDriver');
var Driver = require('../models/driver');


// Save a driver into the rt-db
exports.saveDriver = (req, res) => {
    var driver = new Driver({
        name: req.body.name,
        is_available: req.body.is_available,
        driver_id: req.body.driver_id,
        phone_number: req.body.phone_number,
        image: req.body.image,
        rating: req.body.rating,
        car_details: req.body.car_details,
        location: req.body.location
    });
    

    driver.save(function (err) {
        if (err) return res.send(err);

        res.json(
            {
              message: "Driver added to wait list" 
            }
        )
    });

    // console.log(driver);
    // return res.status(200).json(driver);
}




// Show all the drivers in the rt-db THAT Match Requirements. Essentially a filter FOR RIDERS
exports.showAllDrivers = (req, res) => {
    // use car_type?
    Driver.find({ "is_available": false }).exec(function (err, drivers) {
        if (err) {
            throw err;
        }
        return res.json({drivers});
    });
    
    // res.json({message: "No drivers available"});
}

// Show all the drivers in the rt-db THAT Match Requirements. Essentially a filter
exports.deleteAllDrivers = (req, res) => {
    // use car_type?
    // .remove({})
    Driver.findOneAndRemove({ "is_available": true }, (err, drivers) => {
        if (err) throw err;
        res.json({message: "Removed Users"});
    });
}

// Show just one driver
exports.showDriver = (req, res) => {
 // use driver id?
}