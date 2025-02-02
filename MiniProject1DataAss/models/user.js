const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://AnasAkhter:anas%40gaya123@clusters.i85t2.mongodb.net/miniproject`);

const userSchema = mongoose.Schema({
    username:String,
    name:String,
    age:Number,
    email:String,
    password:String,
    profilepic:{
        type:String,
        default:"default.png"
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
});

module.exports = mongoose.model('user',userSchema)