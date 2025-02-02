const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')
const postModel = require('./models/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const post = require('./models/post')

app.use(cookieParser())
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',isLoggedIn,(req,res)=>{
    console.log("login user without post "+  req.user);
    res.render('login')
})

app.get('/like/:id',(req,res)=>{

})

app.get('/profile',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate('posts')
    console.log("profile user " + user);
    res.render('profile' ,{user});
})

app.get('/like/:id',isLoggedIn,async (req,res)=>{
    let posts = await postModel.findOne({_id:req.params.id}).populate('user')

   if(posts.like.indexOf(req.user.userid) == -1){
        posts.likes.push(req.user.userid);
   }else{
        posts.likes.splice(posts.like.indexOf(req.user.userid),1);
   }
   await post.save();
   res.redirect('/profile')
})

app.post('/post',isLoggedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    const {content} = req.body;
    let post = await postModel.create({
        user:user._id,
        content,
    })

    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
})


app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.status(500).json({
        success:false,
        message:'Somthing Went Wrong'
    })

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            console.log('Password Matched')
            res.status(200).redirect('/profile')
        }else{
            res.redirect('/login')
        }
    })
})

app.get('/logout',(req,res)=>{
    res.cookie('token','');
    res.redirect('/');
})

app.post('/register', (req,res)=>{
    const {name,username,email,password,age} = req.body;

    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let user = await userModel.create({
                name,
                username,
                email,
                password:hash,
                age
            })
            let token = jwt.sign({email:email,userid:user._id},'secretkey');
            console.log( "token in register" + token);
            
            res.cookie('token',token);
            res.send('registered');
        })
    })
})

function isLoggedIn(req,res,next){
    if(req.cookies.token === '') res.redirect('/login')
    else{
        let data = jwt.verify(req.cookies.token,'secretkey');
        console.log("Middleware " + data);
        req.user = data;
    }
    next();
}

app.listen(3000)