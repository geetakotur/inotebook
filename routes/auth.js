const express = require('express');//importing express
const router = express.Router();//importing router
const User = require('../models/User');
const { body, validationResult } = require('express-validator');//for validating user
var bcrypt = require('bcryptjs');//importing bcrypt to use salt and pepper
var jwt = require('jsonwebtoken');//importing jwt to send and receive token
var fetchuser=require('../middleware/fetchuser')
const jwt_secret = "shhwchellooooo"

//Route1:http://localhost:5000/api/auth/createuser
router.post('/createuser', [
  body('name', 'enter valid name').isLength({ min: 3 }),
  body('email', 'enter unique and valid email').isEmail(),
  body('password', 'password must contain atleast 3 characaters').isLength({ min: 5 })],
  async (req, res) => {
    let success=false;
    //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });

    }
    //check whether the user with same email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "sorry!,user with this email already exists" })
      }
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpassword,
      })


      //creating a token and sending it
      const data = {
        user: {
          id: user.id,
        }
      }
      const authtoken = jwt.sign(data, jwt_secret);
      success=true;
      
      res.json({ success,authtoken });

    }
    catch (error) {
      console.error(error.message);
      res.status(500).json("some error occured");
    }



  },

)
//Route2:http://localhost:5000/api/auth/login
router.post('/login', [
  body('email', 'enter unique and valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
],
  async (req, res) => {
    let success=false;
    //if there are errors ,return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({error:"Login with correct credentials"});
      }

      const passwordcompare =await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
      success=false;
        return res.status(400).json({error:"Login with correct credentials"});
      }
      //creating a token and sending it
      const data = {
        user: {
          id: user.id,
        }
      }
      const authtoken = jwt.sign(data, jwt_secret);
      success=true;
      res.json({ success,authtoken });
    }
    catch (error) {
      console.error(error.message);
      res.status(500).json({error:"some error occured"});

    }

  })
  //Route3:http://localhost:5000/api/auth/getuser
router.post('/getuser',fetchuser,  async (req, res) => {
 
    
    try{
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
     res.send(user);
    }
    catch(error){
      console.error(error.message);
      res.status(500).json({error:"some error occured"});
    }
  })

module.exports = router
