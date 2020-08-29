const  Mongoose  = require("mongoose");

var showSchema = new Mongoose.Schema({
    // _id : Mongoose.Schema.Types.ObjectId,
    startTime: {
        type: String,
        required: 'Time is required'
    },
    endTime: {
        type: String,
        required: 'Time is required'
    },
    date: {
        type: String,
        required: 'Date is Required'
    },
    seatAvailable: {
        type: Number,
        default: 20
    }
});

module.exports = Mongoose.model('Show', showSchema);