const Ticket = require('../models/ticket.model');
const mongoose = require('mongoose');
const Show = require('../models/show.model');

exports.bookTickets = async (req,res) => {

    var response,ticketDetails;
    
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
            newTicket.save();
            
            // Details of Ticket to be passed to User for later Changes
            ticketDetails={
                status: "Ticket Booked Sucessfully",
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

