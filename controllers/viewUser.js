const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');
const uniqid = require('uniqid');

exports.viewUser = async (req,res) => {
    
    Ticket.findOne({ticketId: req.body.ticketId},(err,result)=>{
        if(err)
            throw err;
        if(res==null)
            return res.send("**No Ticket available with such ID**");
        console.log(result);
        var userDetails={
            username: result.userDetails.username,
            phone: result.userDetails.phone
        };
        return res.json(userDetails);
    });
};

