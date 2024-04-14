const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    email :{
        type : String, 
        required : [true, "Please add a email"],
        unique : [true, "Email address is already exsit"]
    },
    password: {
        type: String,
        required : [true, "please add the user password"],
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("User" , userSchema);