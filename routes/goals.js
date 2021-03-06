const express = require('express');
const mongoose = require('mongoose');
const router =  express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

require('../models/Goal');
const Goal = mongoose.model('goals');
 
// List all Goals-Index in list - Route
router.get('/',ensureAuthenticated,(req,res)=>{
    Goal.find({user:req.user.id})
    .sort({date:'desc'})
    .then(goals =>{
        res.render('goals/goalsList',{
            goals:goals,
        })
    })
})

// Add Goals-Route form for Input
router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('goals/add')
})

// Edit goals-route
router.get('/edit/:id',ensureAuthenticated,(req,res)=>{
    Goal.findOne({
        _id:req.params.id,
    })
    .then(goal => {
        if(goal.user != req.user.id){
          req.flash('error_msg', 'Not Authorized');
          res.redirect('/goals');
        } else {
          res.render('goals/edit', {
            goal:goal
          });
        }
        
      });
});

// Process post request of form-action="/goalsList"
router.post('/',ensureAuthenticated,(req,res)=>{
         
    let errors = [];
    if(!req.body.title){
      errors.push({text:'Title is missing'})
    }
    if(!req.body.details){
      errors.push({text:"Details are missing"})
    }
    if(errors.length>0){
      res.render('/add',{
        errors:errors,
        title:req.body.title,
        details:req.body.details,
      })
    }
    else{
        const newUser = {
            title:req.body.title,
            details:req.body.details,
            user:req.user.id,
        }
        new Goal(newUser)
        .save()
        .then(goal=>{
        req.flash('success_msg', 'Goal is Added');
            res.redirect('/goals');
        })
    }
})

// Edit form process
router.put('/:id',ensureAuthenticated,(req,res)=> {
    Goal.findOne({
        _id:req.params.id
    })
    .then(goal=>{
        // newly edited values
        goal.title=req.body.title;
        goal.details=req.body.details;

        goal.save()
        .then(goal=>{
            req.flash('success_msg', 'Goal is edited');
            res.redirect('/goals')
        })        
    })
});

// delete request to goals]
router.delete('/:id',ensureAuthenticated,(req,res)=>{
    Goal.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg', 'Goal is removed');
        res.redirect(('/goals'));
    })
})

module.exports = router;