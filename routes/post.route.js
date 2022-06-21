const express=require('express')
const postroute=express.Router()
const { createPost, getAllPost } = require('../controllers/post.controller')
postroute.post("/create",createPost)
postroute.get("/all",getAllPost)
module.exports=postroute