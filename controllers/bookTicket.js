const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const Show = require('../models/user.model');

exports.bookTickets = function(req,res){
    // Creating new User for getting the reference to the ticket schema
    var user = new User;
    user.username=req.body.username;
    user.phone=req.body.phone;
    user.save();
    // User is Created
    
    // Find the show which user want to book the ticket of
    var show = Show 

    // Generate Ticket
    var newTicket = new Ticket;
    newTicket.bookingTime = Date.now();

    return res.json({username: 'piyush', phone: req.body.phone,timing: req.body.timing});
};

