import React, { createContext, useEffect } from 'react'
import socketClient from 'socket.io-client';

import { useDispatch } from 'react-redux';
// import { updateChatLog } from '../../redux/sockets/group/reducer';

export const WebSocketContext = createContext(null)

const WebSocketProvider = ({ children }) => {
    let ws;
    const SERVER = "http://localhost:5000"
    var socket = socketClient(SERVER);
    
    const dispatch = useDispatch();
    const sendMessage = (payload) => {
        socket.emit("message", payload);
        // dispatch(updateChatLog(payload));
    }

    useEffect(()=>{
        socket.on('connection', () => {
            console.log(`connection established successfully`);
        });
    },[])

    ws = { socket, sendMessage }
    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider