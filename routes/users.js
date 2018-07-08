const express = require('express');
const mongoose = require('mongoose');
const router =  express.Router();


// Login route 
router.get('/login', (req,res)=>{
    res.render('../users/login')
    // res.send('login is successful.')
});


// register route 
router.get('/register', (req,res)=>{
    res.render('../users/register')
    // res.send('register is successful.')
});


module.exports = router;