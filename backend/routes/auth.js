const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "JWT_SECRET";
/* 
ROUTE 1 : POST "/api/auth/createuser"
    Create a user using post. No login required
*/
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min:5})
], async (req,res)=>{
    //If there are errors return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    // Check weather the user with same email exists already
    try {let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry  a user with this email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password: secPass
        })  
            // .then(user => res.json(user))
            // .catch(err => console.log(err));
        const data = {
            user :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

/*
ROUTE 2: POST "api/auth/login"
    Authenticating User using Post
*/
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(400).json({error : "Use correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error : "Use correct credentials"});
        }

        const data = {
            user :{
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({authToken});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

/*
ROUTE 3: POST "/api/auth/getuser"
    Get loggedIn user details. Login Required..
*/
router.post('/getuser', fetchuser ,async(req,res) => {

    try{
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;