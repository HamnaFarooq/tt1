require('dotenv').config();
const nodemailer=require('nodemailer');
const Mail = require('nodemailer/lib/mailer');






let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.user,
        pass:process.env.pass
    }
})

// const sendmail=(to,text)=>{
let mailOptions={
                from: "abdurrehmanzab@gmail.com",
                to: "abdurrehmanzab@gmail.com",
                subject: "Invite",
                text: text
            }

            transporter.sendMail(mailOptions,(err,data)=>{
                              if(err){
                    console.log("Error",err)
                  }
                  else{
                    console.log("Mail Sent!")
                  }
                        })
                    // }