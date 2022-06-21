const express = require("express")
const route = express.Router()
const { sendOtp, variefyOtp } = require("../controllers/auth.controller")

route.post("/send-otp", sendOtp)
route.post("/varify-otp", variefyOtp)

module.exports=route