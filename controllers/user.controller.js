const user = require("../modals/user.modal")
const post = require("../modals/post.modal")
const follow = require("../modals/follow.modal")
const mongoose = require('mongoose');
const getUserById = async (req, res) => {
    try {
        let _id = req.query.id
        if (!_id) {
            return res.status(404).json({ success: false, message: "id is not provided" })
        }
        if (mongoose.Types.ObjectId.isValid(_id)) {
            _id = mongoose.Types.ObjectId(_id)
            const userInfo = await user.findOne({ _id }).select('_id name desc image')
            if (!userInfo) {
                return res.status(404).json({ success: false, message: 'user not found' })
            }
            const shorts =await post.find({postedby:_id}).count()
            const ifollow = await follow.findOne({to:_id,by:req.userid}).count()
            const followers=await follow.find({to:_id}).count()
            const followings=await follow.find({by:_id}).count()
            
            return res.status(200).json({ success: true, data:{
                name:userInfo.name,_id:userInfo._id,desc:userInfo.desc,image:userInfo.image,
                shorts:shorts,ifollow:ifollow==0 ? false : true,
                followers,followings
            } })
        } else {
            return res.status(401).json({ success: false, message: "invalid id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    getUserById
}