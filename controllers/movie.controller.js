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
        const resData = await movie.find({}).sort({date_time:-1});
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

module.exports = {
    addMovie,
    getAllMovie,
    getMovieById
}