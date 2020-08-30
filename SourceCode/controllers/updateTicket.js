const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');
const uniqid = require('uniqid');

exports.updateTicket = async (req,res) => {
    //check for the new date and timings validations.
    var unValidMsg="",f=0;
        //Date Validation
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if(!req.body.newDate.match(dateRegex)){
            f=1;
            unValidMsg+="**Date Format is not Valid\n";
        }

        //startTime and endTime Validation
        const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        if(!req.body.newStartTiming.match(timeRegex)){
            unValidMsg+="**New Start Time is not Valid\n";
            f=1;
        }
        if(!req.body.newEndTiming.match(timeRegex)){
            unValidMsg+="**New End Time is not Valid\n";
            f=1;
        }
    if(f)
        return res.send(unValidMsg);
    //Validation Completed


    var updatedTicketDetails; // for storing response to be send to User
    
    // Find the show which user want to book the ticket of (checking if that show is available or not)
    const query={startTime: req.body.newStartTiming, endTime: req.body.newEndTiming , date: req.body.newDate};
    await Show.findOne(query, (err , result) => {
        if(err)
            throw err;
        console.log(result);
        if(result==undefined){
            return res.send("Such Timings of Show not Available");
        }
        else if(result.seatAvailable==0){
            return res.send("Housefull !! Try for another show");
        }
        else{
            Ticket.findOne({ticketId: req.body.ticketId},(err,docs) =>{
                if(docs==undefined){
                    return res.send("Ticket Expired!!");
                }
                else{
                    //Update the seats available for the show
                    Show.updateOne(query,{seatAvailable: result.seatAvailable-1},(err,docs)=>{
                        if(err)
                            throw err;
                    });
                    
                    // Update the Ticket with new Timings..
                    var updateQuery = {showRef:result._id};
                    var findQuery = {ticketId: req.body.ticketId};
                    Ticket.updateOne(findQuery, updateQuery,(err,docss) => {
                        if(err)
                            throw err;
                        // Details of Ticket to be passed to User for later Changes
                        updatedTicketDetails={
                            status: "Ticket Updated Sucessfully!! Store your Ticket ID for later use..",
                            ticketID: docs.ticketId,
                            username: docs.userDetails.username,
                            phone: docs.userDetails.phone,
                            updateTime: docs.bookingTime,
                            updatedshowStartTime: result.startTime,
                            updatedShowEndTime: result.endTime,
                            updatedDateofShow: result.date
                        };
                        return res.json(updatedTicketDetails);
                    });
                }
            });
        }
    });
};
