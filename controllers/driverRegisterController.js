var Driver = require('../models/driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var shortid = require('shortid')

exports.registerDriver = function (req, res) {
    
    /*
    name: String,
    email: String,
    password: String,
    account_status: String,
    is_available: Boolean,
    driver_id: String,
    phone_number: String,
    image: String,
    rating: Number,
    description: String,
    car_details: {
        model: String,
        make: String,
        colour: String,
        type: String,
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
            other_details: String
        }
    }
    */
    var car_details = {
        make: req.body.car_details.make,
        model: req.body.car_details.model,
        colour: req.body.car_details.colour,
        car_type: req.body.car_details.type,
        year: req.body.car_details.year,
        registrations_details: {
            registered_name: req.body.car_details.registration_details.registered_name,
            licence_plate: req.body.car_details.registration_details.licence_plate,
            vin: req.body.car_details.registration_details.vin
        },
        accessibility_options: {
            wheelchair: req.body.car_details.accessibility_options.wheelchair,
            physical_assistance: req.body.car_details.accessibility_options.physical_assistance,
            big_truck: req.body.car_details.accessibility_options.big_truck,
            other_details: req.body.car_details.accessibility_options.other_details
        }
    }
    
    var driver_id = shortid.generate()
    
    var user = new Driver({
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        phone_number : req.body.phone_number,
        account_status: "Locked",
        is_available: false,
        driver_id: driver_id,
        image : "[[image]]",
        rating : req.body.rating,
        user_description : req.body.user_description,
        car_details : car_details
    });
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            
            user.password = hash;
            user.save(function (err) {
                if (err) return res.send(err);

                const payload = { id: user.id, name: user.name };

                var token = jwt.sign(
                    payload,
                    'coolkid',
                    { expiresIn: 3600 }
                );

                return res.json({ message: `Driver Saved! Welcome ${user.name}`, data: user, token: token });
            });
        });
    });
}

exports.getData = function (req, res, next) {
    Driver.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding user.");
        if (!user) return res.status(404).send("User not found");
        res.status(200).send(user);
    });
}

exports.getDriver = (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);
    // if (!isValid) return res.status(400).json(errors);

    var email = req.body.email;
    var password = req.body.password;
    //    console.log("pass: " + pass);
    Driver.findOne({ email }).then(user => {
        if (!user) return res.status(404).json({ message: "User not found", email: email });

        var passwordValid = bcrypt.compareSync(password, user.password);

        if (!passwordValid) {
            return res.status(401).send({ 
                message: "Wrong password",
                auth: false, 
                token: null 
            });
        }

        const payload = { id: user.id, name: user.name };

        var token = jwt.sign(payload, 'coolkid', { expiresIn: 3600 });

        return res.status(200).send({ 
            message: "Found",
            auth: true,
            data: user,
            token: token 
        });
    });
    
    // res.json({ message: "All Rider Requests"});
    //    User.find((err, user) => {
    //        if (err) res.send(err);
    //
    //        res.json({ message: "All Rider Requests" , data: user});
    //    });
}
