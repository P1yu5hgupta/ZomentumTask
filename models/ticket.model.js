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
    userRef: {
        type: Mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

module.exports = Mongoose.model("Ticket", ticketSchema);