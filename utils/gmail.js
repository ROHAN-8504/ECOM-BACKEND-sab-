const nodemailer=require('nodemailer')
async function mail(){

    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.GMAILUSER,
            pass:process.env.GMAILPASSWORD
        }
    })
    
    let message={
        from: process.env.GMAILUSER, // sender address
        to: 'chrohankumar8504@gmail.com', // list of recipients
        subject: "ACCOUNT CREATION", // subject line
        text: "Hi your account is created", // plain text body
        html: "<b>Hi your account is created</b>", // HTML body
      }
    
    await   transporter.sendMail(message)

      console.log("sent")
}
mail();