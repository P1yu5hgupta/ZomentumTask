const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');

exports.deleteTicket = async (req,res) => {
    Ticket.findOne({ticketId: req.body.ticketId},(err,result)=>{
        if(err)
            throw err;
        if(result==null)
            return res.send("**No ticket is available with such ID**")
        Ticket.deleteOne({ticketId: req.body.ticketId},(err,ress)=>{
            if(err)
                throw err;
            console.log(ress);
            return res.send("**Ticket Deleted Success!!**");
        });
    });
};

