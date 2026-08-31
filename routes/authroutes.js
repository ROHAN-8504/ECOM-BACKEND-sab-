const {register,login}=require('../controllers/authcontroller')
const express=require('express')
let router=express.Router()
router.post('/register',register)
router.post('/login',login)
module.exports=router
