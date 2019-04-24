var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SALT = 10;

// Define our beer schema
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
});


//UserSchema.pre('save', function(next) {
//    var user = this;
//
//    // only hash the password if it has been modified (or is new)
////    if (!user.isModified('password')) return next();
//
//    // generate a salt
////    bcrypt.genSalt(SALT, function(err, salt) {
////        if (err) return next(err);
////
////        // hash the password using our new salt
////        bcrypt.hash(user.password, salt, function(err, hash) {
////            if (err) return next(err);
////
////            // override the cleartext password with the hashed one
////            user.password = hash;
////            next();
////        });
////    });
//    
//    
//    
//    
//    
//    
//    
////    let user = this;
////    if (!user.isModified('password')) return next();
////    
////    if (user.password) {
////        bcrypt.genSalt(SALT, function(err, salt) {
////            if (err) return next(err);
////            
////            bcrypt.hash(user.password, salt, null, function(err, hash) {
////                if (err) return next(err);
////                user.password = hash;
////                next(err);
////            });
////        
////        });
////    }
//          
//});




//UserSchema.methods.setPassword = function(password) {
//    
//}
//
//UserSchema.methods.validatePassword = function(password) {
//    
//}

// Export the Mongoose model
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', UserSchema);