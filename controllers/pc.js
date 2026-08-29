const products=require('../models/productmodel')

let bulkproduct=async (req,res)=>{
try {
 await products.insertMany(req.body)
 res.status(201).json({msg:"products saved"})
} catch (error) {
  res.status(500).json({msg:error.message})
}
}


let fetchallproducts=async (req,res)=>{
try {
let allproducts=await products.find()
res.status(200).json(allproducts)
} catch (error) {
  res.status(500).json({msg:error.message})
}
}


let deleteproduct=async (req,res)=>{
try {
  let productid=req.params.id
await products.findByIdAndDelete(productid)
 res.status(200).json({msg:"product  deleted"})
} catch (error) {
  res.status(500).json({msg:error.message})
}
}


let updateproduct=async (req,res)=>{
try {
  let productid=req.params.id
await products.findByIdAndUpdate(productid,req.body)
 res.status(200).json({msg:"product updated"})
} catch (error) {
  res.status(500).json({msg:error.message})
}
}
let serverstatus=(req, res) => {
  res.send('Hello World!')
}

module.exports={bulkproduct,fetchallproducts,deleteproduct,updateproduct,serverstatus}