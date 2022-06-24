const express=require("express")
const user= express.Router()
const { getUserById } = require("../controllers/user.controller")
user.get("/",getUserById)
module.exports=user