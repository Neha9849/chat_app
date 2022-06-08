const mongoose= require('mongoose');
const messagesSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true,
    }
},{timestamps:true});
module.exports = mongoose.model('messages',messagesSchema);