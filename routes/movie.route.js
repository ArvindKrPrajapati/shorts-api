const express=require("express")
const movie= express.Router()
const { addMovie, getMovieById, getAllMovie,deleteById } = require("../controllers/movie.controller")
movie.post("/add",addMovie)
movie.get("/",getMovieById)
movie.get("/all",getAllMovie)
movie.get("/delete",deleteById)
module.exports=movie