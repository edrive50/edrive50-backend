var Request = require('../models/rideRequest');
var Driver = require('../models/driver');
var shortid = require('shortid');
var { DateTime } = require('luxon');



exports.sendRequest = (req, res) => {
    // Creating on Server
    var ride_id = shortid.generate()
    var ride_status = "Searching";
    var ride_time = req.body.ride_time;
    // Gotten From Rider
    var rider_id = req.body.rider_id
    var chosen_driver_id = req.body.chosen_driver_id
    var rider_info = req.body.rider_info
    
    var rideRequest = new Request({
        ride_id: ride_id,
        ride_time: ride_time,
        ride_status: ride_status,
        chosen_driver_id: chosen_driver_id,
        rider_id: rider_id,
        rider_info: rider_info,
    });

    // return res.json({hi: "hi"}); 
    // return res.json({rideRequest})
    
    rideRequest.save(function (err) {
        if (err) return res.send(err);

        res.json(
            {
                message: "ride request sent to driver",
                rideRequest
            }
        )
    });

    // console.log(driver);
    // return res.status(200).json(driver);
}

// FOR THE DRIVER TO POLL
exports.getMyRequest = (req, res) => {
    // use car_type?
    // return res.json({message: "hi"})
    Request.find({ "chosen_driver_id": req.query.id, "ride_status": "Searching" }).exec(function (err, request) {
        if (err) throw err;
        
        
        // return res.json({request})
        if (request.length == 0) {
            return res.json(
                {
                    is_found: false
                }
            );
        } else {
            
            return res.json(
                {
                    is_found: true,
                    request: request[0]
                }
            );
        }
        
    });
}

exports.getMyRequest2 = (req, res) => {
    // use car_type?
    // return res.json({message: "hi"})
    var time =  DateTime.local();
    
    var id = req.query.id;
    
    // Ride Schedule
    // minus(duration: Duration | Object | number): DateTime
    //      Subtract a period of time to this DateTime and return the resulting DateTime
    
    // public diffNow(unit: string | string[], opts: Object): Duration
    
    // see the difference between the ride request in the database and the Date.now() variable
        // see if the time is within 25 minutes of pick up
        // if it is, show the request
    
    
    // var date = DateTime.local().diffNow(aheadDate)
    
    // return res.json({now});
    
    
    Request.find({ "chosen_driver_id": id, "ride_status" : "Searching"}).exec(function (err, request) {
        if (err) throw err;
       
      
        // return res.json({request})
        if (request.length == 0) {
            // find the time between now and 25 minutes ahead <25min
            var now = DateTime.local() 
            var aheadDate = now.plus({ minutes: 25 }).toMillis()
            var beforeDate = now.minus({minutes: 20}).toMillis()
            // // time.plus()
            // Request.findOne({ "ride_time": date}).exec(function (err, rideReq) {
             Request.find({}).where("ride_time").gt(beforeDate).lt(aheadDate).exec(function (err, rideReq) {
                if (err) throw err;
                    
                if (rideReq.length) {
                    var ride_time = rideReq[0].ride_time
                    rideReq[0].chosen_driver_id = id
                    var date = time
                    
                    return res.json({
                        is_found: true,
                        request: rideReq
                    });
                } else {
                    return res.json(
                        {
                            is_found: false
                        }
                    );
                }
                // ride_time
                
                // if nothing
               
            });
           
               
              
            // //     // return res.json({request})
            // //     if (request.length == 0) {
            // //         return res.json(
            // //             {
            // //                 is_found: false
            // //             }
            // //         );
            // //     } else {
                    
            // //         return res.json(
            // //             {
            // //                 is_found: true,
            // //                 request: request
            // //             }
            // //         );
            // //     }
                
            // });
            
            // return res.json(
            //     {
            //         is_found: false
            //     }
            // );
        } else {
            
            return res.json(
                {
                    is_found: true,
                    request: request
                }
            );
        }
        
    });
}

exports.allRequests = (req, res) => {
    Request.find({}).exec(function (err, requests) {
        if (err) throw err;
        return res.json({ requests });
    });
}

exports.deleteRequests = (req, res) => {
    var id = req.query.id;
    if (id == "no") {
        Request.find({}).remove(function (err, request) {
            if (err) throw err;
            return res.json({ message: "All requests deleted"});
        });
        
    } else {
        Request.findOne({ "chosen_driver_id": id }).remove(function (err, request) {
            if (err) throw err;
            return res.json({ message: "requests deleted", request});
        });
    }
   
}

exports.setAvaliablity = (req, res) => {
    var is_available_bool = req.body.available
    var id = req.body.id
    // return res.json({ message: "hi"});
    
    Driver.findOneAndUpdate({driver_id: id}, { $set: {is_available: is_available_bool}}, (err, driver) => {
        if (err) return res.status(500).send(err)
        return res.send({
            message: "Rider available set",
            driver
        });
    });  
}


exports.getDriverRequest = (req, res) => {
    var id = req.query.id
     console.log("id:", id)
   Request.findOne({ "rider_id": id}).exec(function (err, request) {
        if (err) throw err;
        
        // return res.json({
        //         enroute: true,
        //         message: "Driver Enroute",
        //         update: request
        //     })
        // console.log(request)
        if (request == null) {
             return res.json({
                    message: "message does not exist",
                    enroute: false
                })
        }
        
        if (request.ride_status == "enroute") {
            
            var name = ""
            
            Driver.findOne({ "driver_id": request.chosen_driver_id }).exec(function (err, driver) {
                if (err) {
                    throw err;
                }
                console.log(driver)
                name = driver.name
                // console.log("here: ", driver.name, ", or ", driver["name"]);
                // console.log("here: ", driver.phone_number, ", or ", driver.image);
                return res.json({
                    enroute: true,
                    message: "Driver Enroute",
                    request,
                    name: name
                })
            });
            
            
            // console.log("name", name)
            
            //  return res.json({
            //         enroute: true,
            //         message: "Driver Enroute",
            //         request,
            //         name: name
            //     })
            
            
        } else {
            
            // check to see if it is bus from a different ride
            
            // if they are not busy but have been called by a rider
            
            
            
            return res.json({
                enroute: false,
                request
                // request
            })
        }
        
        // return res.json({
        //         enroute: false,
        //         request
        //         // request
        //     })
        
        
        
        // return res.json({request})
        // if (request.length == 0) {
        //     return res.json(
        //         {
        //             is_found: false
        //         }
        //     );
        // } else {
            
        //     return res.json(
        //         {
        //             is_found: true,
        //             request: request
        //         }
        //     );
        // }
        
    });
}


exports.acceptRideRequest = (req, res) => {
    // return res.json(
    //     {
    //         is_found: "e"
    //     }
    // );
    Driver.findOneAndUpdate({ driver_id: req.body.id }, { is_available: false }, (err, driver) => {
        if (err) return res.status(500).send(err);
        return res.send(driver);
    });
}




exports.requestAcceptReject = (req, res) => {
    var reqBoolean = req.query.answer;
    var id = req.query.id;
    
    // Request.findOneAndUpdate({ chosen_driver_id: id }, { ride_status: "enroute" }, (err, driver) => {
    //         if (err) return res.status(500).send(err);
    //         return res.send({message: "updated"});
    // });
    //  return res.json(
    //             {
    //                 message: 'The request was accepted!'
    //             }
    //         );
    
    if (reqBoolean == "true") {
        return res.json(
                {
                    message: 'The request was accepted!',
                    id: id
                }
            );
    } else {
        return res.json(
                {
                    message: 'The request was rejected!'
                }
            );
        
    }
}


// UPDATE



exports.requestAcceptRejectTwo = (req, res) => {
    var reqBoolean = req.query.answer;
    var id = req.query.id;
    
    
    //  return res.json(
    //             {
    //                 message: 'The request was accepted!'
    //             }
    //         );
    
    if (reqBoolean == "true") {
        // return res.json(
        //         {
        //             message: 'The request was accepted!',
        //             id: id
        //         }
        //     );
        
        
        Request.findOneAndUpdate({chosen_driver_id: id}, { ride_status: "enroute" }, (err, driver) => {
            if (err) return res.status(500).send(err);
            // console.log("id:", id);
            return res.send({
                message: "The request was accepted! Ride status updated to [route]",
                accept: true,
                driver
            });
        });
    } else {
         Request.findOneAndUpdate({ chosen_driver_id: id }, { ride_status: "cancelled" }, (err, driver) => {
            if (err) return res.status(500).send(err);
            console.log("GONE");
            return res.send({
                message: "The request was declined. Ride status updated to [cancelled]",
                accept: false,
                name: driver.name
            });
        });
        // return res.json(
        //         {
        //             message: 'The request was rejected!'
        //         }
        //     );
    }
    
    
}


exports.finishRide = (req, res) => {
    var id = req.query.id;
    
    // Request.findOneAndUpdate({ride_id: id}, { ride_status: "done" }, (err, request) => { 
    Request.findOneAndUpdate({ride_id: id}, { $set: {ride_status: "done"}}, (err, request) => {
        if (err) return res.status(500).send(err)
        
        return res.send({
            message: "The ride is finished. Ride status updated to [done]",
            finished: true,
            request
        });
        
    });   
}

exports.sendFeedback = (req, res) => {
    var driver_id =  req.query.id
    var feedback_score = req.query.score
    // add description to feedback
    var details = req.body.details
   
    //   return res.send({
    //         message: "The ride is finished. Ride status updated to [done]",
            
    //     });
   
    Driver.findOne({driver_id: driver_id}).exec(function (err, driver) {
        if (err)  throw err;
        // return res.send({
        //     driver
        // });
       var current_score = driver.rating
       console.log(driver)
       console.log(driver.rating)
       var new_score = 0;
       if (current_score == 0) {
           new_score = feedback_score
          console.log("In here " + new_score, feedback_score)
       } else if (current_score > 0) {
           new_score = feedback_score
          console.log("Wop " + new_score, feedback_score)
       }
       
        Driver.findOneAndUpdate({driver_id: driver_id}, { rating: new_score }, (err, driver) => {
            if (err) return res.status(500).send(err);
            console.log("id:", new_score, driver.rating);
            return res.send({
                message: "Sent feedback.",
                accept: true,
                rating: driver.rating,
                driver
            });
        });
    });
}

