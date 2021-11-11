require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path');

const messageRoutes = require('./routes/message')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')

const {errorHandler} = require('./middleware/middleware')
const Message = require('./models/Message')

dotenv.config()
const app = express()

app.use(express.static(__dirname + '/public/'));
app.use(express.json())
app.use(cors())
app.use(errorHandler)
app.use('/api/v1/chat/',messageRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/profiles',profileRoutes)

const http = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(http, {
    cors:{
        origins: ["*"]
    }
})
const STATIC_CHANNELS = ['global_notifications', 'global_chat'];

const uri = process.env.MONGO_ATLAS_URL
const port = process.env.PORT || 5000

const onlineUsers = {}

io.on('connection',socket => { 
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('message',async (message) => {
        const newMessage = await Message.create(message)
        const {to, from, text, createdAt} = newMessage._doc
        const {_id} = newMessage
        if (onlineUsers.hasOwnProperty(to)) {
            onlineUsers[to].emit("message",{_id, to, from, text, createdAt})
        }
    })
    socket.on('register',username => {
        socket.username = username
        onlineUsers[username] = socket
    })

});

const start = async () => {
    try {
        await mongoose.connect(uri, {useNewUrlParser:true})
        http.listen(port,()=>{
        console.log(`server running on port ${port}...`);
        })
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

start()