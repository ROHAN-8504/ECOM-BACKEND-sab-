const {bulkproduct,fetchallproducts,deleteproduct,updateproduct,serverstatus}=require('../controllers/pc')
const express=require('express')
let router=express.Router()

router.post('/',bulkproduct)
router.get('/',fetchallproducts)
router.get('/status',serverstatus)
router.delete('/:id',deleteproduct)
router.put('/:id',updateproduct)

module.exports=router