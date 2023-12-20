const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Hashirisagoodb@$oy"
let success = false;
// Route 1 : Creating a new User using : POST "/api/auth/createuser".Does't require authentication.
router.post(
  "/createuser",
  [
    body("name", "Please Enter a valid name").isLength({ min: 5 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must contain be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there is an error in given details then return bad request with error
    if (!errors.isEmpty()) {
      return res.status(400).json({success, error: errors.array() });
    }
    // Checking that the user with this email already exists.
    try {
    let user = await User.findOne({ email: req.body.email });
    // if user exists then return bad request with errors
    if (user) {
      res.status(400).json({success ,  error: "User with this email already exists" });
    }
    // if user does not exists then Create a new user
    else {
      // it will generate salt.
      const salt = await bcrypt.genSalt(10)
      // console.log(salt)
      // it will generate hash after combining both plain text password and salt.
      const secret_password =await bcrypt.hash(req.body.password , salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secret_password,
      });
      success = true
      // sending user id in authtoken to verify user at the time of login.
      const data = {
        user : {
          id : user.id
        }
      }
      const authtoken = jwt.sign(data , JWT_SECRET)
      res.json({success , authtoken})
    }
  }
catch (error) {
    console.error(error.message) 
    res.status(500).json({success , error : "Internal Server Error"})
}
}
);

// Route 2 : Logging in user using credentials. "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password" , "Password can not be empty").exists()
  ],
  async (req, res) => {
    // check that the email and password entered by user are satisfying the checks.
    const errors = validationResult(req)
    try {
    // if there are errors return bad request and errors
    if(!errors.isEmpty){
      res.status(400).json({success , error : errors.array()})
    }
    else{
      const {email , password} = req.body;
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({success , error : "Please use valid email"})
      }
      else{
        const user_password = user.password
        // console.log(user_password)
        const password_compare = await bcrypt.compare(password , user_password)
        // console.log(password_compare)
        if(!password_compare){
          res.status(400).json({success , error : "Please enter correct password"})
        }
        else{
          success = true
          const data = {
            user : {
              id : user.id
            }
          }
          const authtoken = jwt.sign(data , JWT_SECRET)
          res.json({success , authtoken})
        }
      }
    }
  }
  catch (error) {
      console.error(error.message) 
      res.status(500).json({success , error : "Internal Server Error"})
  }
  })

  // Route 3 : Fetch user details using authtoken."/api/auth/fetchuser" Login Required
  router.post(
    "/fetchuser",fetchuser,async (req, res) => {
      try {
        // req m hum ne user find krlia h middleware func ko use krke isliye ab hum direct id nikal skte hn
        const user_id = req.user.id
        // console.log(user_id)
        const user =await User.findById(user_id).select("-password")
        success = true
        res.json( success , user)
      }  catch (error) {
        console.error(error.message) 
        res.status(500).json({success ,error : "Internal Server Error"})
    }
    })



module.exports = router;
