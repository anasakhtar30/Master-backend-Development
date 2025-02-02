const express = require('express')
const app = express()
const port = 3000

app.use(function(req,res,next){
    console.log('Middleware chla');
    next();
})

app.use(function(req,res,next){
    console.log('Middleware chla ek baar aur');
    next();
})

app.get('/',(req,res)=>{
    res.send('Champion meraaaaaa anuj')
})

app.get('/about',(req,res)=>{
    res.send('About page hai ye')
})

app.get('/profile',(req,res,next)=>{
    // res.send('Profile page hai ye')
    return next(new Error('Something went wrong'))
})

app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Something broke! We dont have any idea')
})

app.listen(port,()=>{
    console.log('Server established');
})