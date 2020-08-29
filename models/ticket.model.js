const  Mongoose  = require('mongoose');

var ticketSchema = new Mongoose.Schema({
    bookingTime: {
        type: Date,
        default: Date.now
    },
    showRef: {
        type: Mongoose.Schema.ObjectId,
        ref: 'Show'
    },
    userDetails: {
        username: {
            type: String,
            required: 'UserName is required'
        },
        phone:{
            type: Number,
            required: 'Phone Number is required'
        }
    }
});

module.exports = Mongoose.model("Ticket", ticketSchema);