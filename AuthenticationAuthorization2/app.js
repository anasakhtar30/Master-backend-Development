const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      console.log(hash);
      let createdUser = await userModel.create({
        username,
        email,
        password:hash,
        age
      });

      let token = jwt.sign({email:email},'shhhhhhhhhhhhhh')
      console.log(token)
      res.cookie('token',token);
      
      res.send(createdUser);
    });
  });
});

app.get('/login',function(req,res){
    res.render('login');
})

app.post('/login',async  (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.send('Something went wrong')
    // console.log(user.password, req.body.password);
    bcrypt.compare(req.body.password,user.password,function(err,result){
        let token = jwt.sign({email:user.email},'shhhhhhhhhhhhhh')
        console.log(token)
        if(result) res.send('Yes you can login')
        else res.send('Something went wrong');
    });
})

app.get('/logout', function(req,res){
    res.cookie('token',"");
    res.redirect('/')
})

app.listen(3000);
