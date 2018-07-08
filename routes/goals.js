const express = require('express');
const mongoose = require('mongoose');
const router =  express.Router();

require('../models/Goal');
const Goal = mongoose.model('goals');
 
// List all Goals in list - Route
router.get('/goalsList',(req,res)=>{
    Goal.find({})
    .sort({date:'desc'})
    .then(goals =>{
        res.render('goals/goalsList',{
            goals:goals,
        })
    })
})

// Add Goals-Route form for Input
router.get('/add',(req,res)=>{
    res.render('goals/add')
})

// Edit goals-route
router.get('/edit/:id',(req,res)=>{
    Goal.findOne({
        _id:req.params.id,
    })
    .then(goal =>{
        res.render('goals/edit', {
            goal:goal,
        })
    });
    
})

router.put('/goalsList/:id',(req,res)=> {
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
            res.redirect('/goals/goalsList')
        })        
    })
});

// delete request to goals]
router.delete('/:id',(req,res)=>{
    Goal.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg', 'Goal is removed');
        res.redirect(('/goals/goalsList'));
    })
})

// Process post request of form-action="/goalsList"
router.post('/goalsList/',(req,res)=>{
    let errors = [];
    if(!req.body.title){
      errors.push({text:'Title is missing'})
    }
    if(!req.body.details){
      errors.push({text:"Details are missing"})
    }
    if(errors.length>0){
      res.render('goals/add',{
        errors:errors,
        title:req.body.title,
        details:req.body.details,
      })
    }
    else{
        const newUser = {
            title:req.body.title,
            details:req.body.details,
        }
        new Goal(newUser)
        .save()
        .then(goal=>{
        req.flash('success_msg', 'Goal is Added');
            res.redirect('/goals/goalsList');
        })
    }
})


module.exports = router;