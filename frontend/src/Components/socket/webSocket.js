import React, { createContext, useEffect } from 'react'
import socketClient from 'socket.io-client';

export const WebSocketContext = createContext(null)

const WebSocketProvider = ({ children }) => {
    let ws;
    const SERVER = "http://localhost:5000"
    var socket = socketClient(SERVER);
    
    const sendMessage = (payload) => {
        socket.emit("message", payload);
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