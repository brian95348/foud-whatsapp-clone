const Profile = require('../models/Profile')
const Message = require('../models/Message')

const createProfile = async (req,res)=>{
    const newProfile = new Profile({...req.body,url:req.file.filename})
    const savedProfile = await newProfile.save()
    res.status(201).json(savedProfile)
}

const updateProfile = async (req,res)=>{
    let imageURL
    if (!req.file) {
        imageURL = req.body.oldURL
    } else {
        imageURL = req.file.filename
    }
    const updatedProfile = await Profile.findOneAndUpdate(
        {username:req.params.username},
        {
            $set: req.body,
            url: imageURL
        },
        {new:true}
    )
    res.status(200).json({updatedProfile})
}

const deleteProfile = async (req,res)=>{
        await Profile.findOneAndDelete({username:req.params.username})
        res.status(200).json({message:`${req.params.id} deleted successfully`})
}

const getProfile = async (req,res)=>{
    const profile = await Profile.findOne({username:req.params.username})
    if (!profile) {
        throw new Error('$404: Profile not found')
    }
    res.status(200).json(profile)
}

const getAllProfiles = async (req,res)=>{
    const {profile_username} = (req.query);
    const profiles = await Profile.find({user_id:{$ne:req.user.id}})
    const newProfiles = []
    for (let i = 0; i < profiles.length; i++) {
        const profile = profiles[i].toObject()
        const messages = await Message.find({$or: [
                                            {to:profile.username,from: profile_username},
                                            {from:profile.username,to: profile_username}
                                        ]}).sort('-createdAt').limit(1)
        const lastMessage = (messages.length > 0 && messages[0].toObject()) || null
        newProfiles.push({...profile,lastMessage})
    }
    res.status(200).json(newProfiles)
}

module.exports = {getAllProfiles,getProfile,createProfile,deleteProfile,updateProfile}