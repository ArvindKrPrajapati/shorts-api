const mongoose = require('mongoose')

const user=new mongoose.Schema({
    mobile:{
        type:Number,
        unique:true,
        required:true,
        maxlength:10
    },
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:30
    },
    image:{
        type:String,
        default:''
    },
    desc:{
        type:String,
        trim:true,
        maxlength:50,
        default:''
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    datetime: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model("user",user)