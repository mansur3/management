const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
    title : {type : String},
    type : {type : String},
    deadline: {type : Date},
    tags : {type : String},
    time : {type : String}
})

const Contest = mongoose.model("contest", contestSchema);

module.exports = Contest;