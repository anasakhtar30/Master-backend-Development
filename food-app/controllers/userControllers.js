//GET USER INFO
const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')

const getUserController = async (req,res) =>{
    // res.status(200).send('User Data')
    // console.log(req.body.id)

    try{
        //find User
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //hide passsword

        //send response
        res.status(200).send({
            success:true,
            message:"User get Successfully",
            user
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get User API",
            error
        })
    }
}

const UpdateUserController = async (req,res) =>{
    try{
        //find user
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User Not Found"
            })
        }
        //update
        const {username,address,phone} = req.body;
        if(username) user.username = username
        if(address) user.address = address
        if(phone) user.phone = phone
        
        //save
        await user.save();
        res.status(200).send({
            success:true,
            message:"User Updated Successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update User api".
            error
        })
    }
}


//UPDATE USER PASSWORD
const updatePasswordController = async (req,res) =>{
    try{
        //find User
        const user = await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user Not found"
            })
        }

        //get data from user
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"please Provide old or new Password"
            })
        }

        //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Old Password"
            })
        }     
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password Updated"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In password Update API",
            error,
        })
        
    }
}

//reset Password
const resetPasswordController =async (req,res) =>{
    try {
        const {email,newPassword,answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"error IN PASSWORD reset API"
            })   
        }
        const user = await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User Not Found or invalid answer"
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        user.password = hashedPassword
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log(errror);
        res.status(500).send({
            success:false,
            message:"Error in PASSWORD RESET API"
        })
    }
}

//DELETE PROFILE ACCOUNT
const deleteProfileController =async (req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted"
        })
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User isn't present"
            })
        }
        //check
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Profile API"
        })
    }
}

module.exports = {getUserController,UpdateUserController,updatePasswordController,resetPasswordController,deleteProfileController}