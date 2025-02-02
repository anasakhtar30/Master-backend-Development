const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://AnasAkhter:anas%40gaya123@clusters.i85t2.mongodb.net/socialapp`)


const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
    age:Number,
    password:String,

    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ]
})

module.exports = mongoose.model('user',userSchema);