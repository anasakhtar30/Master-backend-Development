const mongoose = require('mongoose')

//Schema 
const categorySchema= mongoose.Schema({
    title:{
        type:String,
        required:[true,'category title is required']
    },
    imageUrl:{
        type:String,
        default:"https://image.similarpng.com/file/similarpng/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png"
    },
    

},{timestamps:true})

//exports
module.exports = mongoose.model('Category',categorySchema);