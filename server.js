const express = require('express')
const app = express()
const User = require('./models/user') 
const db = require('./db')
const bodyParser = require('body-parser')
const path = require('path')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
require('dotenv').config()
const port = process.env.PORT
const route = require('./routes/router')
const newdata = require('./routes/update')
app.use('',route)
app.use('/update-user',newdata)
app.post('/delete-user',async (req,res)=>{
    const userId = req.body.id
    console.log('Request Body:', req.body);
    if (!userId) {
        return res.status(400).send('No ID provided');
    }
    try{
           const response = await User.deleteOne({ID : userId})
           console.log('user deleted')
           res.redirect('/');
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:"An error occured while deleting user data"})
    }
})
app.set('view engine','ejs')
app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));
app.listen(port,()=>{
    console.log('server runs on 3000 port successfully')
})