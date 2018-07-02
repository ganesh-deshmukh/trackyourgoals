const express = require('express');

const app = express();

app.use((req,res,next)=>{
    // console.log(Date.now());
    req.name = "gd";
    next();
});

app.get('/', (req,res)=>{
    console.log(req.name);
    res.send(req.name)
})

app.get('/about', (req,res)=>{
    res.send("About Page");
})

const port = 3000;
app.listen(port , function(){
    console.log(`app is running at port ${port}`);
});