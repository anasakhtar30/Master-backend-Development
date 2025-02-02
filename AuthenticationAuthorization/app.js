const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()

app.use(cookieParser())
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.get('/',(req,res)=>{
    // res.cookie('name','harsh');
    // res.send('cookie created');
    //ENCRYPTION
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("pololololoo", salt, function(err, hash) {
    //         // console.log(salt)
    //         console.log(hash);
            
    //         // Store hash in your password DB.
    //     });
    // });

    // res.send('working')

    //DECRYPTION
    // bcrypt.compare("pololololoo", "$2b$10$fywxOA5nFTXejgp2lDMv4.DBaqU/4T2XaxhQnSArm4NUF77OwsDka", function(err, result) {
    //     // result == true
    //     console.log(result);
        
    // });

    //JWT
    let token = jwt.sign({email:'harsh@example.com'},'secret')
    res.cookie('token',token)
    console.log(token);
    res.send('done')
})

app.get('/read',function(req,res){
    // console.log(req.cookies);
    // res.send('read page')

    // console.log(req.cookies);
    // console.log(req.cookies.token);

    let data = jwt.verify(req.cookies.token,'secret')
    console.log(data);
})

app.listen(3000);