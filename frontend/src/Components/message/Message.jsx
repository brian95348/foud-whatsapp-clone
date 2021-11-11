import React, {useState,useEffect,useContext} from 'react'
import {chatContext} from '../../pages/chat/Chat'
import './Message.css'


function Message({textAlign,id,text,createdAt}) { 
  const [selected, setSelected] = useState(false)
  const updateTopMenu = useContext(chatContext);
  const newDate = new Date()
  const date = (createdAt && createdAt.split('T')[0]) || newDate.toISOString().split('T')[0]
  const time = (createdAt && createdAt.split('T')[1].split('.')[0]) || newDate.toISOString().split('T')[1].split('.')[0]
  const dateTime = date.concat('  ',time)
  const handleOnClick = () => {
    setSelected(val => !val)
  }

  useEffect(()=>{
    updateTopMenu(selected,id,text)
  },[selected])

  return (
    <div style={{textAlign}} className={selected ? "selected" : ""} onClick={handleOnClick}>
        <div id="message-wrap"> 
        <span>{text}</span>
      <span>{dateTime }</span>     
    </div>
    </div>
    
  )
}

export default Message
