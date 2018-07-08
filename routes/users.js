const express = require('express');
const mongoose = require('mongoose');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model(structure of table)
require('../models/User');
const User = mongoose.model('users');    //users is a file/Model name passed.

// Login route 
router.get('/login', (req,res)=>{
    res.render('./users/login')
    // res.send('login is successful.')
});

// user register route 
router.get('/register', (req,res)=>{
    res.render('users/register')
    // res.send('register is successful.')
});

// Login form post-request
router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/goals/goalsList',
        failureRedirect:'/users/login',
        failureFlash:true,
    })(req,res,next);
})
 
// Register POST form
router.post('/register', (req,res)=>{
    let errors = [];

    if(req.body.password != req.body.password2){
            errors.push({text:'Password don\'t match'});
    }
    if(req.body.password.length<4){
        errors.push({text:'Password must be at least 4 characters'})
    }
    if(errors.length > 0 ){
        res.render('./users/register', {
            errors:errors,
            name:req.body.name,
            email:req.body.email,
        });
        console.log('error occured \n', errors)
    }
    else{
        User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                req.flash('error_msg',"Email already Exist, Enter other email");
                res.redirect('/users/register');
            }
            else{
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                });
        
                bcrypt.genSalt(10,(error,salt)=>{
                    bcrypt.hash(newUser.password,salt,(error,hash)=>{
                        if(error) throw error;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                          req.flash('success_msg','You are successfully registerd.');
                          res.redirect('login')
                        })
                        .catch(err =>{
                                console.log(err);
                                return;
                        })
                    })
                });
            }
        })
    }
});


module.exports = router;