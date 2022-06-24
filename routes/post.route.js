const express=require('express')
const postroute=express.Router()
const { createPost, getAllPost, myPosts } = require('../controllers/post.controller')
postroute.post("/create",createPost)
postroute.get("/all",getAllPost)
postroute.get("/mypost",myPosts)
module.exports=postroute