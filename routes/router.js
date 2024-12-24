const express = require('express')
const router = express.Router()
const app = express()
const User = require('../models/user') 
router.get('/',async (req,res)=>{
    try
    {
     const users = await User.find()
     res.render('index',{users})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:"failed to fetch details"})
    }
})
router.get('/add-user',(req,res)=>{
    res.render('user')
})
router.post('/new-user',async (req,res)=>{
    console.log(req.body)
    const {ID, Name, Email, Gender, Status} =  req.body;
    try{
           const newuser = new User({ID,Name,Email,Gender,Status})
           await newuser.save()
           console.log({newuser})
           res.redirect('/');
    }
    catch(err)
    {
       console.log(err)
       res.status(500).json({error:"An error occured while adding user data"})
    }
})
module.exports = router 
