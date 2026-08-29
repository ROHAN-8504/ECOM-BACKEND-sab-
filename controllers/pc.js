module.bulkinsert=async (req,res)=>{
try {
 await products.insertMany(req.body)
 res.json({msg:"products saved"})
} catch (error) {
  res.json({msg:error.message})
}
}