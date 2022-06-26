const post = require('../modals/post.modal')
const mongoose = require("mongoose")
const createPost = async (req, res) => {
    try {
        const { url, desc } = req.body
        if (url) {
            const data = await post.create({ url, desc, postedby: req.userid })
            res.status(200).json({ success: true, data: { message: "post created" } })
        } else {
            res.status(404).json({ success: false, message: "url is required" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


const myPosts = async (req, res) => {
    try {
        let _id = req.query.id
        const skip = Number(req.query.skip) || 0
        if (!_id) {
            return res.status(404).json({ success: false, message: "id is not provided" })
        }
        if (mongoose.Types.ObjectId.isValid(_id)) {
            _id = mongoose.Types.ObjectId(_id)
            const data = await post.aggregate([
                { $match: { postedby: _id } },
                { $sort: { datetime: -1 } },
                { $skip: skip },
                { $limit: 8 },
                {
                    $project: {
                        url: 1,
                        views: { $cond: { if: { $isArray: "$views" }, then: { $size: "$views" }, else: 0 } },
                        likes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0 } },
                        comments: { $cond: { if: { $isArray: "$comments" }, then: { $size: "$comments" }, else: 0 } }
                    }
                },


            ])
            return res.status(200).json({ success: true, data })
        } else {
            return res.status(401).json({ success: false, message: "invalid id" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const react = async (req, res) => {
    try {
        const { postid, like } = req.body
        if (!postid) {
            return res.status(404).json({ success: false, message: "postid is not provided" })
        }
        if (mongoose.Types.ObjectId.isValid(postid)) {
            const _id = mongoose.Types.ObjectId(postid)
            if (like) {
                const data=await post.findByIdAndUpdate(_id,{$push:{likes:{by:req.userid}}},{new:true})
                return res.status(200).json({ success: true, data:"liked" })
            } else {
                const data=await post.findByIdAndUpdate(_id,{$pull:{likes:{by:req.userid}}},{new:true})
                return res.status(200).json({ success: true, data:"disliked" })
            }
        } else {
            return res.status(401).json({ success: false, message: "invalid postid" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const createComment = async (req, res) => {
    try {
        const { postid, comm } = req.body
        if (!postid && !comm) {
            return res.status(404).json({ success: false, message: "postid or comm is not provided" })
        }
        if (mongoose.Types.ObjectId.isValid(postid)) {
            const _id = mongoose.Types.ObjectId(postid)
                const data=await post.findByIdAndUpdate(_id,{$push:{comments:{by:req.userid,comm}}},{new:true})
                return res.status(200).json({ success: true, data:"your comment is added" })
        } else {
            return res.status(401).json({ success: false, message: "invalid postid" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getAllPost = async (req, res) => {
    try {
        const data = await post.aggregate([
            { $lookup: { from: 'users', localField: 'postedby', foreignField: '_id', as: 'postedby' } },
            { $unwind: '$postedby' },
            {
                $project: {
                    url: 1,
                    desc: 1,
                    postedby: { _id: 1, name: 1, image: 1 },
                    likes: { $cond: { if: { $isArray: "$likes" }, then: { $size: "$likes" }, else: 0 } },
                    comments: { $cond: { if: { $isArray: "$comments" }, then: { $size: "$comments" }, else: 0 } },
                }
            },
            { $addFields: { isLiked: false } }
        ])
        //  const data = await post.find({}).populate("postedby", "_id name image").select("-__v")
        res.status(200).json({ success: true, data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    createPost, getAllPost, myPosts, react,createComment
}






// {$sort:{datetime:-1}},
