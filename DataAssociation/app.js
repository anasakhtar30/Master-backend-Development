const express = require('express')
const app = express()
const userModel = require('./models/user')
const postModel = require('./models/post')


app.get('/',(req,res)=>{
    res.send('Hey')
})

app.get('/create',async (req,res)=>{
    // const {username,email,age,post} = req.body;
    let user = await userModel.create({
        username:"harsh",
        age:25,
        email:'harsh@gmail.com'
    })
    res.send(user);
})

app.get('/post/create',async (req,res)=>{
    let post = await postModel.create({
        postdata:'hello saare log kaise ho',
        user:"679bb0550ff780b2cc03fbe8",
   })
   
   let user = await userModel.findOne({_id:"679bb0550ff780b2cc03fbe8"})
   console.log(user);
   user.posts.push(post._id);
   await user.save();

   res.send({post,user});
})

app.listen(3000)