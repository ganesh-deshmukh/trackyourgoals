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
});

// user register route 
router.get('/register', (req,res)=>{
    res.render('users/register')
});

// Login form post-request
router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/goals',
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
        console.log('\nerror occured \n', errors)
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
        
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if(err) throw err;
                      newUser.password = hash;
                      newUser.save()
                        .then(user => {
                          req.flash('success_msg', 'You are now registered and can log in');
                          res.redirect('/users/login');
                        })
                        .catch(err => {
                          console.log(err);
                          return;
                        });
                    });
                  });
            }
        })
    }
});

// Logout user route

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', ' You are logged out');
    res.redirect('/users/login')
})

module.exports = router;