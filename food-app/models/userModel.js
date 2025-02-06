const mongoose = require('mongoose')


//Schema 
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
    },

    password:{
        type:String,
        required:[true,'password is required']

    },
    address:{
        type:Array,

    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin','vendor','driver']
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&s'
    },
    answer:{
        type:String,
        required:[true,'Answer is required']
    }
},{timestamps:true})

//exports
module.exports = mongoose.model('User',userSchema);