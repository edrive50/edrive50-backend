// use twillio account and fill in required tokens to use message service

// const accountSid = '';
// const authToken = '';
// const client = require('twilio')(accountSid, authToken);

exports.sendStartMessage = (req, res) => {
    return res.json({message: "Please add account SID and authToken in the backend to use this service."})
    // var number = req.query.number // the number you would like to send to; make sure you '+1' at beginning of string
    // var rider = req.query.rider
    // var driver = req.query.driver
    // client.messages
    //   .create({
    //      body: `${rider} is using edrive50 and is starting their ride with ${driver}.`,
    //      from: '+16137017624',
    //      to: number 
    //   })
    //   .then(message => console.log(message.sid))
    //   .then(() => {
    //       return res.json({message: "Message Sent"});
    //   });
}