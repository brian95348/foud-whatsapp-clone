const Message = require('../models/Message')

const deleteMessages = async (req,res)=>{
    const messageIDs = req.body
    for (let i = 0; i < messageIDs.length; i++) {
        await Message.findByIdAndDelete({_id : messageIDs[i].id})       
    }
    res.status(200).json({success:true})
}

const getMessages = async (req,res)=>{
    const {profile_username} = (req.query);
    const {chatname} = (req.params);
    const Messages = await Message.find({$or: [
            {to:chatname,from: profile_username},
            {from:chatname,to: profile_username}
                ]}).sort('createdAt')
    res.status(200).json(Messages)
}

module.exports = {getMessages,deleteMessages}