const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are mandatory!');
    }
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400);
        res.status(500).json({ message: 'User already registered'});
        throw new Error('User already registered');
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hashed password:', hashedPassword);
  
      // Create new user
      const user = await User.create({ email, password: hashedPassword });
  
      // Send response with user data
      res.status(201).json({
        _id: user._id,
        email: user.email,
      });
    } catch (error) {
      // Handle errors
      console.error('Error creating user:', error.message);
  
      // Check if headers have already been sent
      if (!res.headersSent) {
        // Send error response
        res.status(500).json({ message: 'Server error' });
      }
    }
  });

  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
  
    try {
      const user = await User.findOne({ email });
      console.log("Number of contacts:", user.contacts.length);
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              email: user.email,
              id: user.id,
              contacts:user.contacts.length,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
  
        res.status(200).json({ accessToken } );
      } else {
        res.status(401);
        throw new Error("Email or password is not valid");
        
      }
    } catch (error) {
      // Handle errors
      console.error('Error logging in user:', error.message);
  
      // Send error response if headers have not been sent
      if (!res.headersSent) {
        res.status(500).json({ message: error.message  });
      }
    }
  });

module.exports = { registerUser , loginUser};
