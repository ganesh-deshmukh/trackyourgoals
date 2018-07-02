const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');


// Index Route 
app.get('/', (req,res)=>{
    const title = "welcome home!";
    res.render('index', {
        title:title,
    });
})

// About Route
app.get('/about', (req,res)=>{
    res.render("about");
})

const port = 3000;
app.listen(port , function(){
    console.log(`app is running at port ${port}`);
});