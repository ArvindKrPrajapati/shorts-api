const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const post=new mongoose.Schema({
  url:{
      type:String,
      required:true
  },
  thumb:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    trim:true,
    maxlength:50
  },
  postedby:{
      type:ObjectId,
      ref:'user'
  },
  likes:[  {
    by:{type:ObjectId,ref:'user'},
    datetime : { type : Date, default: Date.now }
}],
  comments:[
      {
          by:{type:ObjectId,ref:'user'},
          comm:String,
          datetime : { type : Date, default: Date.now }
      }
  ],
  views:[
    {
        by:{type:ObjectId,ref:'user'},
        datetime : { type : Date, default: Date.now }
    }
],
  datetime : { type : Date, default: Date.now }

})

module.exports=mongoose.model("post",post)