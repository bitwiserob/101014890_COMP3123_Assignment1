const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employee = new mongoose.Schema({
    first_name:{
        type: String,
        maxLength: 100,
        required: [true, "missing first name"]

    },
    last_name:{
        type: String,
        maxLength: 50,
        required: [true, "missing last name"]
    },
    email:{
        type: String,
        unique: true,
        maxLength: 50,
        required: [true, "missing email"]
    },
    gender:{
        type: String ,
        enum:['male', 'female','other'],
        maxLength: 50,
        required: [true, "missing gender"]
    },
    salary:{
        type: Number,
        maxLength: 50,
        required: [true, "missing salary"]
    }



})

module.exports = mongoose.model("employee", employee)
