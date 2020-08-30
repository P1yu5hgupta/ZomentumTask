const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');
const uniqid = require('uniqid');

exports.viewTickets = async (req,res) => {

    //check for the phone , date and timings validations.
    var unValidMsg="",f=0;
        
        //Date Validation
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if(!req.body.date.match(dateRegex)){
            f=1;
            unValidMsg+="**Date Format is not Valid\n";
        }

        //startTime and endTime Validation
        const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        if(!req.body.startTiming.match(timeRegex)){
            unValidMsg+="**Start Time is not Valid\n";
            f=1;
        }
        if(!req.body.endTiming.match(timeRegex)){
            unValidMsg+="**End Time is not Valid\n";
            f=1;
        }
    if(f)
        return res.send(unValidMsg);
    //Validation Completed
    
    var response,tickets=[]; // for storing response to be send to User
    const query={startTime: req.body.startTiming, endTime: req.body.endTiming , date: req.body.date};
    Show.findOne(query,(err,result) =>{
        if(err)
            throw err;
        console.log(result);
        // find the all tickets for that particular show
        Ticket.find({showRef: result._id},(err,docs)=>{
            if(err)
                throw err;
            docs.forEach(item => {
                var ticketDetails={
                    status: "Ticket Booked Sucessfully!! Store your Ticket ID for later use..",
                    ticketID: item.ticketId,
                    username: item.userDetails.username,
                    phone: item.userDetails.phone,
                    bookingTime: item.bookingTime,
                    showStartTime: result.startTime,
                    showEndTime: result.endTime,
                    DateofShow: result.date
                };
                tickets.push(ticketDetails);
            });
            return res.json(tickets);
        });
    });
};

