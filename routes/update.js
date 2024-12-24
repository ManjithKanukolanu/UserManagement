const express = require('express')
const router = express.Router()
const app = express()
const User = require('../models/user') 
router.get('',async (req,res)=>{
    const userId = req.query.id
    try{
          const userobj = await User.findOne({ ID : userId})
          console.log({userobj})
          if(userobj)
          {
            res.render('update',{ userobj })
          }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:"an error occured"})
    }
})
router.post('',async (req,res)=>{
  const userId = req.query.id
  try{
        const updatedata = req.body
        const response = await User.findOneAndUpdate({ID: userId},updatedata,{
          new: true,
          runValidators: true
        })
     console.log('Candidate data updated')
     res.redirect('/');
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:"An error occured while updating user data"})
  }
})
module.exports = router 