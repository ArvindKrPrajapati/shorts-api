const express=require("express")
const movie= express.Router()
const { addMovie, getMovieById, getAllMovie } = require("../controllers/movie.controller")
movie.post("/add",addMovie)
movie.get("/",getMovieById)
movie.get("/all",getAllMovie)

module.exports=movie