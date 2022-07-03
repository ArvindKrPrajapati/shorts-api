const otps = require('../modals/otp.modal')
const user = require("../modals/user.modal")
const twilio = require('twilio');
const jwt = require('jsonwebtoken');

const sendOtp = async (req, res) => {
    try {
        const { mobile } = req.body
        if (!mobile) {
            return res.status(400).json({ success: false, message: "mobile number is required" })
        }
        if (isNaN(mobile)) {
            return res.status(400).json({ success: false, message: "invalid number (NaN)" })
        }
        if (mobile.length === 10) {
            const otp = Math.floor(100000 + Math.random() * 900000);
            const query = { mobile };
            const update = { mobile, otp };
            const options = { upsert: true, new: true };

            const data = await otps.findOneAndUpdate(query, update, options);

            const accountSid = process.env.TWILIO_ACCOUNT_SID;
            const authToken = process.env.TWILIO_AUTH_TOKEN;
            const myTwilioNumber = process.env.TWILIO_NUMBER

            const client = twilio(accountSid, authToken);

            client.messages
                .create({
                    body: 'welcome to shorts \n your otp varification code is ' + otp,
                    to: '+91' + mobile,
                    from: myTwilioNumber,
                })
                .then((message) => {
                    return res.status(200).json({ success: true, data: { message: "otp send to " + mobile + " number" } })
                })
                .catch((err)=>{
                    return res.status(200).json({ success: true, data: { message: "otp send to " + mobile + " number" } })
                });
        } else {
            return res.status(400).json({ success: false, message: "invalid number" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const variefyOtp = async (req, res) => {
    try {
        const { mobile, otp } = req.body
        if (!mobile && !otp) {
            return res.status(400).json({ success: false, message: "mobile and otp both are required" })
        }
        if (isNaN(mobile) && isNaN(otp)) {
            return res.status(400).json({ success: false, message: "invalid number and otp (NaN)" })
        }

        if (mobile.length === 10 && otp.length === 6) {
            const varify = await otps.findOne({ mobile, otp })
            if (varify) {
                const userExists = await user.findOne({ mobile })
                var token;
                if (userExists) {
                    token = jwt.sign({_id:userExists._id, image: userExists.image, name: userExists.name }, process.env.JWT_SECRET);
                } else {
                    const name = "user" + Math.floor(10000 + Math.random() * 90000);
                    const newUser = await user.create({ mobile, name })
                    token = jwt.sign({_id:newUser._id, image: newUser.image, name: newUser.name }, process.env.JWT_SECRET);
                }
                await otps.findOneAndDelete({ mobile })
                return res.status(200).json({ success: true, data: token })
            } else {
                return res.status(401).json({ success: false, message: "wrong otp" })
            }
        } else {
            return res.status(400).json({ success: false, message: "invalid number or otp" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "server error" })
    }
}

module.exports = {
    sendOtp, variefyOtp
}