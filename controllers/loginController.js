var Rider = require('../models/rider');
var Driver = require('../models/driver');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjRlZGY4YzQ5MWQzMmZkNDIxZTJmMyIsIm5hbWUiOiJPbGl2ZSBTb24iLCJpYXQiOjE1NTAxMTgzOTIsImV4cCI6MTU1MDEyMTk5Mn0.y2XpBSg_SPJnazjjL0JZTmT7EfGoLBoUsQkPeYft5J4

    //    const { errors, isValid } = validateLoginInput(req.body);
    //    
    //    if (!isValid) return res.status(400).json(errors);

    var email = req.body.email;
    var password = req.body.password;
    //    console.log("pass: " + pass);
    // var isDriver = false;
    // var isUser = false;
    Rider.findOne({ email }).then(user => {
        // if (!user) return res.status(404).json({ message: "User not found", email: email });
        if (user) {
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
                user_type: "Rider",
                auth: true,
                data: user,
                token: token 
            });
        }
    });
    
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
        
        if (user.account_status == "Locked") {
            return res.status(401).send({ 
                message: "Account is Locked",
                auth: false, 
                token: null 
            });
        }

        const payload = { id: user.id, name: user.name };

        var token = jwt.sign(payload, 'coolkid', { expiresIn: 3600 });
        

        return res.status(200).send({ 
            message: "Found",
            user_type: "Driver",
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
