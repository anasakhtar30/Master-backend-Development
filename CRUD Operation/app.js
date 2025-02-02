const express = require('express')
const app = express()
const userModel = require('./usermodel')


app.get('/',(req,res)=>{
    res.send('Hey')
})

app.get('/create',async (req,res)=>{
    //Asynchronous
    let createduser = await userModel.create({
        name:'Anas',
        email:'anasmallick8757@gmail.com',
        username:'Anas Akhter'
    })
    res.send(createduser);
})

app.get('/read' ,async (req,res)=>{
    let users = await userModel.find();
    res.send(users);
})

app.get('/update',async (req,res)=>{
    
   let updatedUser = await userModel.findOneAndUpdate({username:'Anas Akhter'},{name:'Harsh vandana sharma'},{new:true})

    res.send(updatedUser);
})


app.get('/delete',async (req,res)=>{
    let deleteduser = await userModel.findOneAndDelete({name:'Anas'})

    res.send(deleteduser)
})


app.listen(3000)