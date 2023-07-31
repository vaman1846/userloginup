const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    image:{ type:String, required:true},
    // cropCoordinates:{ type:String, required:true},
    likes:{type:Number, default:0}
});

const Image = mongoose.model('Image',imageSchema)
module.exports = Image
