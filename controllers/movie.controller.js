const movie = require("../modals/movie.modal")


const addMovie = async (req, res) => {
    try {
        const data = req.body
        const resData = await movie.findOneAndUpdate({ id: data.id }, data, { upsert: true, new: true });
        return res.status(200).json({ success: true, data: resData })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getAllMovie = async (req, res) => {
    try {
        const page= Number(req.query.page)
        const limit=20
        let skip=0
        if(page >0){
           skip=(page-1)*limit
        }
        const resData = await movie.find({}).sort({datetime:-1}).skip(skip).limit(limit)
        return res.status(200).json({ success: true, data: resData })

    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getMovieById = async (req, res) => {
    try {
        const {id}=req.query
        const resData = await movie.findOne({id});
        return res.status(200).json({ success: true, data: resData })

    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const deleteById = async (req, res) => {
    try {
        const {id}=req.query
        const resData = await movie.findByIdAndRemove(id);
        return res.status(200).json({ success: true, data: resData })

    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    addMovie,
    getAllMovie,
    getMovieById,
    deleteById
}