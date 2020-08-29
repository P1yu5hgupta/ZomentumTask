const  Mongoose  = require("mongoose");

var showSchema = new Mongoose.Schema({
    startTime: {
        type: string,
        required: 'Time is required'
    },
    endTime: {
        type: string,
        required: 'Time is required'
    },
    date: {
        type: string,
        required: 'Date is Required'
    },
    seatAvailale: {
        type: Number,
        default: 20
    }
});

module.exports = Mongoose.model('Show', showSchema);