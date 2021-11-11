const User = require('../models/User')
const Profile = require('../models/Profile')
const cryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const register = async (req,res) => {
    const isAdmin = req.body.isAdmin ? req.body.isAdmin: false
    const newUser = new User({...req.body,isAdmin: isAdmin})
    const savedUser = await newUser.save()
    res.status(201).json({status:'created',newUser:savedUser})
}

const login = async (req,res) => {
    const {username} = req.body
    const user = await User.findOne(req.body)
    if (!user) return res.status(404).json({message: "User not found!, check your username"})
    const profile = await Profile.findOne({user_id:user._id})
    const profileUsername = (profile && profile.username) || null
    const accessToken = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d"
    })
    return res.status(200).json({accessToken,id: user._id,username: user.username,
                                    profile:profileUsername})
}

module.exports = {login,register}