const user = require("../modals/user.modal")
const mongoose = require('mongoose');
const getUserById = async (req, res) => {
    try {
        let _id = req.query.id
        if (!_id) {
            return res.status(404).json({ success: false, message: "id is not provided" })
        }
        _id = mongoose.Types.ObjectId(_id)
        const data = await user.findOne({ _id }).select('_id name desc image')
        if(!data){
            return res.status(404).json({success:false,message:'user not found'})
        }
        res.status(200).json({ success: true, data })
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    getUserById
}