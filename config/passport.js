 // define strategy

const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const passport = require('passport');
const session = require('express-session');

// Match email_id passed.

const User = mongoose.model('users');

module.exports = (passport)=>{
   passport.use(new localStrategy({usernameField:'email'},
   (email,password,done)=>{
        User.findOne({
            email:email
        }).then(user => {
            if(!user){
                return done(null,false,{message:'No User Found.'});
            } // done(error,user,message);

            // Match entered password by valid user
            bcrypt.compare(password,user.password,(err,isMatch )=>{
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }
                else{
                    return done(null, false, {message:'Incorrect Password is entered.'}); 
                }
            })
        })
   })) 
   
   passport.serializeUser(function(user,done){
       done(null, user.id)
   })
   passport.deserializeUser(function(id,done){
       User.findById(id,function(err,user){
           done(err, user)
       })
   })
}   