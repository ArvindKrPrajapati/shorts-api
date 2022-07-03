const express=require("express")
const user= express.Router()
const { getUserById, liveSearch } = require("../controllers/user.controller")
user.get("/",getUserById)
user.get("/search",liveSearch)
module.exports=user