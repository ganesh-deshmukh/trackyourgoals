const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

const goals = require('./routes/goals');
const users = require('./routes/users');

// To get rid of warning - use Map global promise
mongoose.Promise = global.Promise;
// Connecting to db
mongoose.connect('mongodb://localhost/goal-tracker',{
})
 .then(()=>{console.log('MongoDB Connected')})
 .catch(err =>{console.log(err)})

// Handlebars middleware 
app.engine('handlebars', exphbs(
    {
        defaultLayout: 'main',
        // layoutsDir: __dirname + '/views/layouts/',
        // partialsDir: __dirname + '/views/partials/'
    }
));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Body-parser middleware to accept form data
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Static folder of path-middleware
app.use(express.static(path.join(__dirname, 'public')));


// middleware for method override, put and delete.
app.use(methodOverride('_method'));

// Express-Session middleware
app.use(session({
    secret:'password2encrypt',
    resave:false,
    saveUninitialized:true,
}));

app.use(flash());

// Global variable
app.use((req,res,next)=>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    next();
});


//  Index Route-Homepage 
app.get('/', (req, res) => {
    const title = "welcome!";
    res.render('index', {
        title: title,
    });
})

// About Route
app.get('/about', (req, res) => {
    res.render("about");
})

app.use('/goals',goals)
app.use('/users',users)


const port = 3000;
app.listen(port, function () {
    console.log(`app is running at port ${port}`);
});

// use VS-studio-code-IDE. (ALT+SHIFT+F) for indentation and formating like a pro-coder.

