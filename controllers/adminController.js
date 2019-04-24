var Driver = require('../models/driver');

exports.getDrivers  = (req, res) => {
    Driver.find().then(drivers => {
        return res.json({drivers})
    });
}

exports.deleteDriver = (req, res) => {
    var id = req.query.id;
    Driver.findOne({ "chosen_driver_id": id }).remove(function (err, request) {
        if (err) throw err;
        return res.json({ message: "requests deleted", request});
    });
}
    
exports.unlocked = (req, res) => {
    var str = req.body.unlocked
    
    
    var arr = (function () {
        var obj = JSON.parse(str);
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(obj[prop]);
            }
        }
        return arr;
    })();
    
    var first = arr[0]
    
    
    arr.forEach((id) => {
        // console.log(id)
        Driver.findOneAndUpdate({ "driver_id": id }, { account_status: "Unlocked" }, (err, driver) => {
            if (err) throw err;
        
        });
    });
    
    return res.json({ message: "account(s) unlocked"});
    
    // return res.json({first});
   
}

exports.locked = (req, res) => {
    var str = req.body.locked
    
    
    var arr = (function () {
        var obj = JSON.parse(str);
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(obj[prop]);
            }
        }
        return arr;
    })();
    
    var first = arr[0]
    
    
    arr.forEach((id) => {
        // console.log(id)
        Driver.findOneAndUpdate({ "driver_id": id }, { account_status: "Locked" }, (err, driver) => {
            if (err) throw err;
        
        });
    });
    
    return res.json({ message: "account(s) locked"});
    
    // return res.json({first});
   
}