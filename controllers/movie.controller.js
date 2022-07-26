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

module.exports = {
    addMovie
}