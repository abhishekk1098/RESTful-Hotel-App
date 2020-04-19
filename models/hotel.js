var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
    name : String,
    address : String,
    location : String,
    phone : Number,
    description : String,
    image : String,
    roomtype : String,
    roomdesc : String,
    price : String,
    rating : String,
    checkout : String,
    accessibility : String,
    cancellation : String,
    houserules : [String],
    amenities : [String],
    created : {type : Date , default : Date.now}
});

module.exports = mongoose.model("Hotel",hotelSchema);