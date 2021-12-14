// var api_key='d3dc735ba7238a8327b568755e9d21ea-45f7aa85-dddb7d46'
// var domain='sandbox9e41edac87014c00807064fe2d86cf7e.mailgun.org'
// var mailgun=require('mailgun-js')({apiKey:api_key,domain:domain})

// var mailOptions={
//     from: "abdurrehmanzab@gmail.com",
//     to: "abdurrehmanzab@gmail.com",
//     subject: "Invite",
//     text: "hey!"
// }
// mailgun.messages().send(mailOptions,function(err,body){
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log(body)
//   }
// })

// require('dotenv').config()
// const nodemailer=require('nodemailer')
// const SendmailTransport = require('nodemailer/lib/sendmail-transport')

// const transporter=nodemailer.createTransport({
//     host: 'smtp.mailgun.org',
//     port:587,
//     secure:'false',
//     auth:{
//         user: 'test@sandbox9e41edac87014c00807064fe2d86cf7e.mailgun.org',
//         pass:'e10e0bff89fcdd03bda3eaf7810e31bf-45f7aa85-e708a68f'
//     }
// })

// sendmail=()=>{
//     let mailOptions={
//             from: "abdurrehmanzab@gmail.com",
//             to: "abdurrehmanzab@gmail.com",
//             subject: "Invite",
//             text: "hey!"
//         }
//         transporter.sendMail(mailOptions,(err,info)=>{
//               if(err){
//     console.log(err)
//   }
//   else{
//     console.log("Mail Sent! ${info.response}")
//   }
//         })
// }
// sendmail()


require('dotenv').config();
const nodemailer=require('nodemailer')


let transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.user,
        pass:process.env.pass
    }
})

let mailOptions={
                from: "abdurrehmanzab@gmail.com",
                to: "ammarshahid008@gmail.com",
                subject: "Invite",
                text: "hey!"
            }

            transporter.sendMail(mailOptions,(err,data)=>{
                              if(err){
                    console.log("Error",err)
                  }
                  else{
                    console.log("Mail Sent!")
                  }
                        })

                    



                        // const nodemailer=require('nodemailer')
                        // const mailGun=require('nodemailer-mailgun-transport')
                        
                        
                        
                        // const auth={
                        //     auth:{
                        //         api_key: "d3dc735ba7238a8327b568755e9d21ea-45f7aa85-dddb7d46" ,
                        //         domain: "sandbox9e41edac87014c00807064fe2d86cf7e.mailgun.org"
                        //     }
                        // }
                        
                        // const transporter=nodemailer.createTransport(mailGun(auth))
                        // // service: "hotmail",
                        // // auth:{
                        // //     user:"abdurrehman1660@hotmail.com",
                        // //     pass:"*101*1*07#"
                        // // }
                        
                        // const sendmail=(to,text,cb)=>{
                        // const mailOptions={
                        //     from: "abdurrehman1660@hotmail.com",
                        //     to: to,
                        //     subject: "Invite",
                        //     text: text
                        // }
                        
                        // transporter.sendMail(options,function(err,data){
                        //     if(err){
                        //         cb(err,null)
                        //     }
                        //     else{
                        //         cb(null,data)
                        //     }
                        // })
                        // }
                        
                        // module.exports=mail