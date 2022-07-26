const express=require("express")
const movie= express.Router()
const { addMovie } = require("../controllers/movie.controller")
movie.post("/add",addMovie)

module.exports=movie