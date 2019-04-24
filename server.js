const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var verifyToken = require("./auth/verify-token");
var passport = require("./auth/passport");
var flash = require('connect-flash');
const session = require('express-session');

// Controllers
var userController = require('./controllers/userController');
var rideRequestController = require('./controllers/rideRequestController');
var driverRequestController = require('./controllers/driverRequestController');
var riderRegisterController = require('./controllers/riderRegisterController');
var driverRegisterController = require('./controllers/driverRegisterController');
var rideHistoryController = require("./controllers/rideHistoryController");
var loginController = require("./controllers/loginController");
var adminController = require("./controllers/adminController");
var sendSMSController = require("./controllers/sendSMS")

// connect to rider-alert MongoDB
mongoose.connect('mongodb://localhost:27017/RequestDB', { useNewUrlParser: true })
mongoose.set('debug', true);


var app = express(); // create our express application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());
app.use(session({
    secret: 'coolkid',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('debug', true);

var port = process.env.PORT || 3000; // use defined port or port 3000
var router = express.Router(); // create express router

router.get('/', function (req, res) {
    res.json({ message: 'Get the things!' });
});

/**
 * 1. Send driver info to server
 * 2. Server saves it to driver document
 * 3. When rider wants a driver, they request the list of drivers in the document, send as json   
 *      a. The list will be filtered before sending
 * 4. The rider picks a driver, send it back to server 
 *      a. Create ride request that contains the some of the user's details, especially their id [HERE]
 * 5. Driver is polling and picks up change and is sent the request
 * 6. Driver can accept
 *      a. If the driver accepts
 *              i. They are sent the json with the user's info
 *             ii. Driver begans journey
 *            iii. Rider is sent back confirmation (Rider has been polling for information)
 *      b. If the driver rejects
 *             i. Request is sent to next driver available (by distance and need)     
 */

// // router.route('/register')
// //     .post(userController.saveUser);
    

router.route('/login')
    .post(loginController.login);

// // router.route('/register/driver')
    

router.route('/register/rider')
    .post(riderRegisterController.registerRider);
    
router.route('/register/driver')
    .post(driverRegisterController.registerDriver);
    
    
// REQUESTS

router.route('/driver')
    .post(driverRequestController.saveDriver); // 1 and 2

// router.route('/driver/my-request')
//     .get(rideRequestController.getMyRequest);

router.route('/answer')
    .put(rideRequestController.acceptRideRequest); // 6a

router.route('/available-rides')
    .get(driverRequestController.showAllDrivers) // 3
    .delete(driverRequestController.deleteAllDrivers);
    
    
    // TODO: figure out what happened to riders name and image entries in the getrequest
// router.route('/ride-request')
//     .post(rideRequestController.sendRequest)  // 4
//     .get(rideRequestController.getMyRequest); 
router.route('/driver/availability')
    .put(rideRequestController.setAvaliablity);
    
router.route('/ride-request')
    .post(rideRequestController.sendRequest)
    .get(rideRequestController.getMyRequest2) 
    .delete(rideRequestController.deleteRequests);
    
router.route('/ride-request/all')
    .get(rideRequestController.allRequests)
    
router.route('/ride-request/answer')
    .get(rideRequestController.requestAcceptReject); // 6
    
router.route('/ride-request/answer')
    .put(rideRequestController.requestAcceptRejectTwo)
    
router.route('/ride-request/response')
    .get(rideRequestController.getDriverRequest); // 6
    
router.route('/ride-request/rider/complete/')
    .put(rideRequestController.finishRide);
    
router.route('/ride-request/rider/send-feedback/')
    .put(rideRequestController.sendFeedback);
    
    
    
// // RIDE HISTORY
    
router.route('/ride-history')
    .post(rideHistoryController.saveHistory);


router.route('/ride-history/rider/')
    .get(rideHistoryController.retrieveAllHistoryRider);



router.route('/ride-history/driver/')
    .get(rideHistoryController.retrieveAllHistoryDriver);
    
    
// SEND SMS

router.route('/family-contact/message')
    .get(sendSMSController.sendStartMessage)
    
    
// WEBSITE

router.route('/admin/drivers/')
    .get(adminController.getDrivers)
    .delete(adminController.deleteDriver)

router.route('/admin/drivers/unlock')
    .put(adminController.unlocked)
    
router.route('/admin/drivers/lock')
    .put(adminController.locked)

// router.route('/me')
//     .get(verifyToken, userController.getData);

// // --------------------------------- |||| REGISTER ||||
// // Register all our routes with /api
app.use('/app', router);

//Start server
app.listen(port);
console.log("Insert on port " + port);