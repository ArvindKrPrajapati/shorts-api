const express=require("express")
const user= express.Router()
const { getUserById, liveSearch, editProfile } = require("../controllers/user.controller")
user.get("/",getUserById)
user.get("/search",liveSearch)
user.patch("/edit",editProfile)
module.exports=user