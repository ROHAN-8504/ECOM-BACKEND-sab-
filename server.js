const express = require('express'); 
const morgan = require('morgan');
require('dotenv').config();
let dbconnection=require('./config/db')
let limiter=require('./middlewares/ratelimit')
const logging=require('./middlewares/customlogger')
const app = express()
const port = process.env.PORT || 5000
//import the routes
let productroutes=require('./routes/pr')
let authroutes=require('./routes/authroutes')
//middleware
app.use(express.json())
//app.use(logging)
app.use(morgan('common'));
app.use(limiter)

app.use('/products',productroutes)
app.use('/auth',authroutes)


app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
  dbconnection();
})