const express= require("express")
const app=express()
const cors=require("cors")
const {data}=require("./data")
require("dotenv").config()
var nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
   res.status(200).json(data)
})

// send mail route
app.post("/send-mail", (req, res) => {
    try {
      const { name, email, text } = req.body
      if (name && email && text) {
        const mytext = ` ${name} \n ${email} \n ${text}`;
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'wedeveloper3@gmail.com',
            pass: 'oxgpliybgrejgfbd'
          }
        });
        var mailOptions = {
          from: 'wedeveloper3@gmail.com',
          to: 'arvindsoft37@gmail.com',
          subject: 'Email From Portfolio Website',
          text: mytext
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            res.status(500).json({ success: false, error: "Error while sending" })
          } else {
            res.status(200).json({ success: true, data: "Email sent successfully" })
            // console.log('Email sent: ' + info.response);
          }
        });
      } else {
        res.status(500).json({ success: false, error: "All field are required" })
      }
    } catch (error) {
      res.status(500).json({ success: false, error })
    }
  })
  // end
  
app.listen(PORT,()=>{
    console.log("listening at port "+PORT);
})