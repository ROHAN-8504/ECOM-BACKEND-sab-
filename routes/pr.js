const {bulkproduct,fetchallproducts,deleteproduct,updateproduct,serverstatus}=require('../controllers/pc')
const express=require('express')
const authmiddleware=require('../middlewares/authmiddleware')
const authorizemiddleware=require('../middlewares/authorizemiddleware')
let router=express.Router()

router.post('/',authmiddleware,authorizemiddleware('products:create'),bulkproduct)
router.get('/',authmiddleware,authorizemiddleware('products:read'),fetchallproducts)
router.get('/status',serverstatus)
router.delete('/:id',authmiddleware,authorizemiddleware('products:delete'),deleteproduct)
router.put('/:id',authmiddleware,authorizemiddleware('products:update'),updateproduct)

module.exports=router