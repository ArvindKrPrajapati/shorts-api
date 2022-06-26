const express=require('express')
const postroute=express.Router()
const { createPost, getAllPost, myPosts, react, createComment } = require('../controllers/post.controller')
postroute.post("/create",createPost)
postroute.get("/all",getAllPost)
postroute.get("/mypost",myPosts)
postroute.post("/react",react)
postroute.route("/comment").post(createComment)
module.exports=postroute