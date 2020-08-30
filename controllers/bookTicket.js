const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');
const uniqid = require('uniqid');

exports.bookTickets = async (req,res) => {

    //check for the phone , date and timings validations.
    var unValidMsg="",f=0;
        //Date Validation
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if(!req.body.date.match(dateRegex)){
            f=1;
            unValidMsg+="**Date Format is not Valid\n";
        }
        //Phone Validation
        const phoneRegex = /^\d{10}$/;
        if(!req.body.phone.match(phoneRegex)){
            unValidMsg+="**Phone Number is not Valid\n";
            f=1;
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

    var response,ticketDetails; // for storing response to be send to User
    
    // Find the show which user want to book the ticket of (checking if that show is available or not)
    const query={startTime: req.body.startTiming, endTime: req.body.endTiming , date: req.body.date};
    await Show.findOne(query, (err , result) => {
        if(err)
            throw err;
        console.log(result);
        if(result==undefined){
            response = "Show not Available";
        }
        else if(result.seatAvailable==0){
            response = "Housefull !! Try for another show";
        }
        else{
            // Update the seats available for that show
            Show.updateOne(query,{seatAvailable: result.seatAvailable-1},(err,docs)=>{
                if(err)
                    throw err;
            });

            // Generate the ticket and save in database
            var newTicket = new Ticket;
            newTicket.showRef = result._id;
            newTicket.userDetails.username = req.body.username;
            newTicket.userDetails.phone = req.body.phone;
            // Generate a unique TicketID using uniqid (npm module)
            newTicket.ticketId = uniqid("ID-");
            newTicket.save();

            // Details of Ticket to be passed to User for later Changes
            ticketDetails={
                status: "Ticket Booked Sucessfully!! Store your Ticket ID for later use..",
                ticketID: newTicket.ticketId,
                username: newTicket.userDetails.username,
                phone: newTicket.userDetails.phone,
                bookingTime: newTicket.bookingTime,
                showStartTime: result.startTime,
                showEndTime: result.endTime,
                DateofShow: result.date
            };
            console.log(ticketDetails)
        }
    });
    if(ticketDetails!=undefined)
        return res.json(ticketDetails);
    else
        return res.send(response);
};

