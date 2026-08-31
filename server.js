const express = require('express'); 
const morgan = require('morgan');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config();
let dbconnection=require('./config/db')
let users=require('./models/usermodel')
let limiter=require('./middlewares/ratelimit')
const logging=require('./middlewares/customlogger')
const app = express()
const port = process.env.PORT || 5000
//import the routes
let productroutes=require('./routes/pr')
//middleware
app.use(express.json())
//app.use(logging)
app.use(morgan('common'));
app.use(limiter)

app.use('/products',productroutes)

//app.method(PATH,HANDLER)

app.post('/register',async (req,res)=>{

try {
  const {name,email,password,role}= req.body

if(!name || !email || !password ||!role){
  return res.json({msg:"missing fields"})
}
let existinguser=await users.findOne({email})

if(existinguser){
  return res.status(409).json({msg:"user already exists"})
}
//hash passwords
let hashedpassword=await bcrypt.hash(password,10)

await users.create({name,password:hashedpassword,email,role})

res.status(201).json({msg:"registartion succesfull"})

} catch (error) {
  res.status(500).json({msg:error.message})
}

})

app.post('/login',async (req,res)=>{

try {
  const {email,password}=req.body

  if(!email || !password){
  return res.json({msg:"missing fields"})
}

let existinguser=await users.findOne({email})
if(!existinguser)
{
  return res.json({msg:"username or password is incorrect"})
}

let ispassword=await bcrypt.compare(password,existinguser.password)

if(!ispassword){
    return res.json({msg:"username or password is incorrect"})

}
 //token generation

let payload={
  email:email
}

 let token=await jwt.sign(payload,process.env.JWTSECRET,{expiresIn:'7d'})

 res.json({msg:"login succesfull",token})
} catch (error) {
   res.status(500).json({msg:error.message})

}



  


})


















app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
  dbconnection();
})