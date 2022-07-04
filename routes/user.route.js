const express=require("express")
const user= express.Router()
const { getUserById, liveSearch, editProfile, updateDp } = require("../controllers/user.controller")
user.get("/",getUserById)
user.get("/search",liveSearch)
user.patch("/edit",editProfile)
user.patch("/edit/dp",updateDp)
module.exports=user