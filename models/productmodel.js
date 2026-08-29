const mongoose = require("mongoose");

let productschema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true,max:1000},
    rating:{type:Number,required:true},
    category:{name:{type:String,required:true}},
    count:{type:Number,required:true,default:0}
})

module.exports=mongoose.model('products',productschema)