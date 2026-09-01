const mongoose = require("mongoose");

let userschema=new mongoose.Schema({
    name:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,trim:true,min:8},
    email:{type:String,required:true,unique:true,trim:true,index:true},
    role:{type:String,required:true,enum:["seller","buyer"]}
},{timestamps:true})

module.exports=mongoose.model('users',userschema)