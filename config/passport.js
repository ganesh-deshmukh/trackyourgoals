// define strategy

const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// Load user model
const User = mongoose.model('users');

module.exports = (passport)=>{
   passport.use(new localStrategy({usernameField:'email'},
   (email,password,done)=>{
        console.log(email)
        console.log(password)
   })) 
}