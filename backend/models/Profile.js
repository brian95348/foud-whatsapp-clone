const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
    {
        user_id:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        status:{
            type: String,
            default: "Hey there i'm using whatsApp"
        },
        url:{
            type: String,
            default: 'index.png'
        },
    }, {timestamps: true}
)

module.exports = mongoose.model("Profile",ProfileSchema)