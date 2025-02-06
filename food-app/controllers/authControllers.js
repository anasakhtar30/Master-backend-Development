const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

// REGISTER
const registerController = async (req,res) => {
    try{
        const {username,email,password,phone,address,answer} = req.body;
        //validation
        if(!username || !email || !password || !phone || !address || !answer){
            return res.status(500).send({
                success:false,
                message:"Please Provide All Fields"
            })
        }
        //check user
        const existing = await userModel.findOne({email});
        if(existing) return res.status(500).send({
            success:false,
            message:"Email Already Registered Please Login"
        })

        //hashing password
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create new user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            address,
            phone,
            answer,
        })
        res.status(201).send({
            success:true,
            message:"Successfully Registered",
            user,
        })

    }catch(error){
        console.log(error); 
        res.status(500).send({
            success:false,
            message:"Error In register API",
            error
        })
    }
} 


//LOGIN
const loginController = async (req,res) => {
    try{
        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please Provide Email or Password"
            })
        }
        //check user
        let user = await userModel.findOne({email:email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not Found"
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
        //token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        
        user.password = undefined // Password will hide
        res.status(200).send({
            success:true,
            message:"Login successfully",
            token,
            user
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Login API"
        })
    }
}


module.exports = {registerController,loginController}   