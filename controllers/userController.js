// var User = require('../models/users');
var Rider = require('../models/rider');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.saveUser = function(req, res) {
    var user = new Rider();
    // Set the beer properties that came from the POST data
    user.email = req.body.email;
    user.password = req.body.password;
    user.name = req.body.name;
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
//            console.log("email: " + user.email + ", password: " + user.password);
            user.password = hash;
            user.save(function (err) {
                if (err)
                    return res.send(err);
                
                const payload = { id: user.id, name: user.name };


                var token = jwt.sign(
                    payload,
                    'coolkid',
                    { expiresIn: 3600 },
//                        (err, token) => {
//                            res.json({success: true , data: user, token: `Bearer ${ token }`});
//                        }
                );

                res.json({ message: `User Saved! Welcome ${user.name}`, data: user, token: token });
            });
            
//            user.save()
//                .then(user => {
//                    res.json(user);
////                    console.log("email: " + user.email + ", password: " + user.password);
//                })
//                .catch(user => console.log(err));
        });  
    });
}

// exports.getData = function(req, res, next) {
    
//     User.findById(req.userId, { password: 0 }, (err, user) => {
//         if (err) return res.status(500).send("There was a problem finding user.");
// //
//         if (!user) return res.status(404).send("User not found");
// //            
// //      
//         res.status(200).send(user);
//     });
// }

// exports.getUser = (req, res) => {
//     //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjRlZGY4YzQ5MWQzMmZkNDIxZTJmMyIsIm5hbWUiOiJPbGl2ZSBTb24iLCJpYXQiOjE1NTAxMTgzOTIsImV4cCI6MTU1MDEyMTk5Mn0.y2XpBSg_SPJnazjjL0JZTmT7EfGoLBoUsQkPeYft5J4
    
// //    const { errors, isValid } = validateLoginInput(req.body);
// //    
// //    if (!isValid) return res.status(400).json(errors);
    
//     var email = req.body.email;
//     var password = req.body.password;
// //    console.log("pass: " + pass);
//     Rider.findOne({ email: email }).then(rider => {
//         if (!rider) return res.status(404).json({email: "User not found"});
        
//         var passwordValid = bcrypt.compareSync(password, rider.password);
        
//         if (!passwordValid) return res.status(401).send({auth: false, token: null});
        
//         const payload = { id: rider.id, name: rider.name };
//         var token = jwt.sign(payload, 'coolkid', { expiresIn: 3600 });
        
//         res.status(200).send({auth: true, token: token});
        
        
        
// //         res.json({ data: user });
// //        bcrypt.hash(password, 10, (err, hash) => {
// //            const pass = hash; 
// ////            console.log("email " + pass);
// //            bcrypt.compare(password, user.password, function (err, result) {
// //                console.log(user.password, result);
// //                if (!err) {
// //                    const payload = { id: user.id };
// //
// //
// //                    var token = jwt.sign(
// //                        payload,
// //                        'coolkid',
// //                        { expiresIn: 3600 },
// //    //                        (err, token) => {
// //    //                            res.json({success: true , data: user, token: `Bearer ${ token }`});
// //    //                        }
// //                    );
// //                    
// //                     res.json({success: true , data: user});
// //                } else return res.status(400).json({message: "password is wrong."});    
// //            });
// //        });
            
//     });
//     // res.json({ message: "All Rider Requests"});
// //    User.find((err, user) => {
// //        if (err) res.send(err);
// //
// //        res.json({ message: "All Rider Requests" , data: user});
// //    });
// }






//exports.postUser = function(req, res) {
//    // Create a new instance of the Beer model
//    var user = new User();
//
//    // Set the beer properties that came from the POST data
//    user.email = req.body.email;
//    user.password = req.body.password;
//
//    // Save the beer and check for errors
//    user.save(function (err) {
//        if (err)
//            res.send(err);
//
//        res.json({ message: `Rider Request from ${rider.name}`, data: rider });
//    });
//};

//exports.getRider = (req, res) => {
//    // res.json({ message: "All Rider Requests"});
//    User.find((err, user) => {
//        if (err) res.send(err);
//
//        res.json({ message: "All Rider Requests" , data: user});
//    });
//}