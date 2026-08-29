let mongoose=require('mongoose')
require('dotenv').config()
let dbconnection=async ()=>{

    try {
      await mongoose.connect(process.env.MONGODBURL)
      console.log('db is connected')
    } catch (error) {
        console.log(error.msg)
        process.exit(1)
    }

}
module.exports=dbconnection
