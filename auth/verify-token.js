var jwt = require("jsonwebtoken");


verifyToken = (req, res, next) => {
    
    var token = req.headers['x-access-token'];
    
    // No token provided
    if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    
    //jwt.verify
    jwt.verify(token, 'coolkid', (err, decoded) => {
        if (err) res.status(500).send({auth: false, message: 'Failed to authenticate token'});
        
        req.userId = decoded.id;
//        console.log("--------" + decoded.id);
        next();
        
        
//        res.status(200).send(decoded);
    });
}

module.exports = verifyToken;