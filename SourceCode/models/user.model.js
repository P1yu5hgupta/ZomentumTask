const  Mongoose = require("mongoose");

var userSchema = Mongoose.Schema({
    username: String,
    phone: Number
});

module.exports = Mongoose.model("User", userSchema);