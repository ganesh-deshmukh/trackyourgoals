const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// To get rid of warning - use Map global promise
mongoose.Promise = global.Promise;
// Connecting to db
mongoose.connect('mongodb://localhost/goal-tracker',{
})
 .then(()=>{console.log('MongoDB Connected')})
 .catch(err =>{console.log(err)})

 // import Goal.js and assin value of model in variable Goal
 require('./models/Goal');
const Goal = mongoose.model('goals');
 
// Handlebars middleware 
app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main',
        layoutsDir: __dirname + '/views/layouts/',
        partialsDir: __dirname + '/views/partials/'
    }
));
app.set('view engine', 'handlebars');

// Body-parser middleware to accept form data
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Index Route 
app.get('/', (req, res) => {
    const title = "welcome!";
    res.render('index', {
        title: title,
    });
})

// List Goals-list Route
app.get('/goals',(req,res)=>{
    res.render('goals/goals')
})

// About Route
app.get('/about', (req, res) => {
    res.render("about");
})

// Add Goals-Route form for Input
app.get('/goals/add',(req,res)=>{
    res.render('goals/add')
})

// Process post request of form-action="/goals"
app.post('/goals/',(req,res)=>{
    console.log(req.body);
    res.send('ok');
})

const port = 3000;
app.listen(port, function () {
    console.log(`app is running at port ${port}`);
});

// use VS-studio-code-IDE. (ALT+SHIFT+F) for indentation and formating like a pro-coder.

