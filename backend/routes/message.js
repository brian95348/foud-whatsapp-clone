const path = require('path')
const router = require('express').Router()
const {verifyToken} = require('../middleware/verifyToken')
const { getMessages,deleteMessages } = require('../controllers/message')

//delete Messages
router.post('/delete',verifyToken,deleteMessages)

//get chat messages
router.get('/:chatname',verifyToken,getMessages)

module.exports = router




