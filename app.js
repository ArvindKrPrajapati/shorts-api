const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
var nodemailer = require('nodemailer');
const { data } = require("./data")
const auth = require("./routes/auth.route")
const postroute = require("./routes/post.route")
const user=require("./routes/user.route")
const authlogin = require("./middleware/auth.middleware")
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use("/v1/auth",auth)
app.use("/v1/post",authlogin, postroute)
app.use("/v1/user",authlogin, user)



app.get("/", (req, res) => {
    res.status(200).json({ success: true, data })
})
// // send mail route

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
const init = async () => {
    try {
        await mongoose.connect(process.env.URL)
        app.listen(PORT, () => console.log('server is listening at PORT ' + PORT))
    } catch (error) {

    }
}
init()