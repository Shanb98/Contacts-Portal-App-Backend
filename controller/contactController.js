const asyncHandler = require("express-async-handler");
const  Contact = require("../models/contactModel")
const User = require("../models/userModel");

const createContact = asyncHandler(async (req, res) => {
    //printing the request body
    console.log("The request body is : ", req.body);
  
    //destructuring the request body sent from the client side
    const { name, email, phone ,gender} = req.body;
  
    //validating the name,email and phone and displaying the error message
    if (!name || !email || !phone || !gender) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
      name, //equls to request.body.name. in es6 key and value is same we can use key
      email,
      phone,
      gender,
      user_id: req.user.id, //req.user will come from the middleware

    });

    const user = await User.findById(req.user.id);
    user.contacts.push(contact._id);
    await user.save();
    res.status(201).json(contact);
  });

  module.exports = { createContact};