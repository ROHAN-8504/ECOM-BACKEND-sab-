const express = require('express'); 
const {rateLimit}=require('express-rate-limit')
require('dotenv').config();
let dbconnection=require('./config/db')
let products=require('./models/productmodel') 
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(function(req,res,next){
  console.log(req.method,Date.now())
  next();
})

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})


app.use(limiter)






app.post('/products',async (req,res)=>{
try {
 await products.insertMany(req.body)
 res.status(201).json({msg:"products saved"})
} catch (error) {
  res.json({msg:error.message})
}
})

app.get('/products',async (req,res)=>{
try {
let allproducts=await products.find()
res.status(200).json(allproducts)
} catch (error) {
  res.json({msg:error.message})
}
})


app.delete('/products/:id',async (req,res)=>{
try {
  let productid=req.params.id
await products.findByIdAndDelete(productid)
 res.status(200).json({msg:"product  deleted"})
} catch (error) {
  res.json({msg:error.message})
}
})

app.put('/products/:id',async (req,res)=>{
try {
  let productid=req.params.id
await products.findByIdAndUpdate(productid,req.body)
 res.status(200).json({msg:"product  deleted"})
} catch (error) {
  res.json({msg:error.message})
}
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
  dbconnection();
})