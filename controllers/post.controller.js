const post = require('../modals/post.modal')

const createPost = async (req, res) => {
    try {
        const { url, desc } = req.body
        if (url && desc) {
            const data = await post.create({ url, desc, postedby: req.userid })
            res.status(200).json({ success: true, data: { message: "post created" } })
        } else {
            res.status(404).json({ success: false, message: "url and desc is required" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}

const getAllPost = async (req, res) => {
    try {
        const data = await post.find({}).populate("postedby","_id name image").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    createPost, getAllPost
}