const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://AnasAkhter:anas%40gaya123@clusters.i85t2.mongodb.net/testauthapp`);

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password : String,
    age: Number
});

module.exports = mongoose.model('user',userSchema)
