const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema({
    username:{
        type: String,
        primaryKey: true,
        maxLength: 100,
        required: [true, "missing user_name"]

    },
    email:{
        type: String,
        unique: true,
        maxLength: 50,
        required: [true, "missing user_email"]
    },
    password:{
        type: String,
        maxLength: 50,
        required: [true, "missing password"]
    }


})

module.exports = mongoose.model("user", user)
