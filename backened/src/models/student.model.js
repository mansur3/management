const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : {type : String},
    city : {type : String},
    age : {type : Number},
    education : {type : String},
    gender : {type : String},
    contact : {type : Number}
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;