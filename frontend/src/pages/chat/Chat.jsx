import React, { useRef, useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import {WebSocketContext} from '../../Components/socket/webSocket'
import { fetchMessages } from '../../redux/Messages/list/reducer'
import {deleteMessages} from '../../redux/Messages/delete/reducer'
import {fetchProfileDetail} from '../../redux/Profiles/detail/reducer'
import TopMenu from '../../Components/top-menu/TopMenu'
import Message from '../../Components/message/Message'
import './Chat.css'

export const chatContext = React.createContext();

function Chat() {
  const { styles } = useSelector(state => state.global);
  const { messages } = useSelector(state => state.messages);
  const { token, username,profile_username } = useSelector(state => state.userLogin)
  const {profile } = useSelector(state => state.profileDetail)
  const {deleted,deleteMessagesError} = useSelector(state => state.deleteMessages)
  const ref = useRef();
  const { profileUsername } = useParams()
  const dispatch = useDispatch();
  const [text, setText] = useState('') 
  const [selectedMsgs, setSelectedMsgs] = useState(0)
  const [markedMessages, setMarkedMessages] = useState([])
  const [msgs, setMsgs] = useState([])
  const [icons,setIcons] = useState({microphone:true,send:false,camera:true})
  const history = useHistory();
  const ws = useContext(WebSocketContext);

  useEffect(()=>{
    ws.socket.emit("register",profile_username)
    dispatch(fetchProfileDetail(profileUsername,token))
    dispatch(fetchMessages(profileUsername, profile_username, token))
  },[])

  const sendMessage = () => {
        const message = {to: profileUsername,text, from: profile_username }
        ws.sendMessage(message);
        setMsgs([...msgs,message])
        setText('')
    }

  useEffect(()=>{
    setMsgs([...messages])
  },[messages])

  const updateChatLog = () => {
    setMsgs([...msgs.filter(msg => {
      for (let i = 0; i < markedMessages.length; i++) {
        return msg.text !== markedMessages[i].text        
      }
    })])
  }

  useEffect(()=>{
    deleted && updateChatLog()
    deleteMessagesError && console.log(deleteMessagesError);
  },[deleted])

  function updateTopMenu(selected,id,text) {
    selected && setSelectedMsgs(prev=>prev+1)
    selected && setMarkedMessages([...markedMessages,{id,text}])
    selectedMsgs!== 0 && !selected && setSelectedMsgs(prev=>prev-1)
    !selected && setMarkedMessages([
      ...markedMessages.filter(msg=>msg.text !== text)
    ])
  }

  const handleDelete = () => {
    dispatch(deleteMessages(markedMessages,token))
    setSelectedMsgs(0)
  }

  const handleOnChange = (e) => {
    const value = e.target.value
    if (value.length === 0) {
      setIcons({microphone:true,send:false,camera:true})
    } else {
      setIcons({microphone:false,camera:false,send:true})
    }
    setText(value)
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) ref.current.click()
  }
  
  ws.socket.on("message",(data) => {
    setMsgs([...msgs,data])
  })

  return (
    <chatContext.Provider value={updateTopMenu} >
    <section style={styles}>
      <div style={{ backgroundColor: styles.nav.backgroundColor, color: styles.nav.color }} className="chat-detail-header">
        <div className="profile-info">
          <i onClick={()=>history.push('/')} style={{color:styles.nav.color}} className="far fa-arrow-alt-circle-left"></i>
          <Link to={`/settings/profile/${username}`}>
          <img src={`/assets/Profiles/${profile.url}`}  />
          <h2>{profile.username}</h2>
          </Link>
        </div>
        <div className="chat-detail-icons">
          <i className="fas fa-video"></i>
          <i className="fas fa-phone-alt"></i>
          <i className="fa fa-ellipsis-v nav-drop-down"></i>
        </div>
      </div>
      <div style={{ color: styles.nav.color }} className="status-div">
        {profile.status}
      </div>
      {selectedMsgs !== 0 && <TopMenu>
          <div className="chat-top-menu">
            <div className="first-span">
              <i onClick={()=>history.push('/')} style={{ color: styles.nav.color }} className="far fa-arrow-alt-circle-left"></i>
            <p>{selectedMsgs}</p>
            </div>
            <div className="second-span">
            <i className ="fas fa-reply"></i>
            <i className ="fas fa-star"></i>
            <i className ="fas fa-share"></i>
            <i style={{cursor:'pointer'}} onClick={handleDelete} className ="fa fa-trash"></i>
            <i className="fa fa-ellipsis-v"></i>
            </div>
          </div>
      </TopMenu>}
      <div className="message-display">
        {msgs.length > 0 && msgs.map(msg => {
        return <Message key={msg._id || Math.random()} id={msg._id} textAlign={profile_username===msg.to ? "left" : "right"} text={msg.text} createdAt={msg.createdAt} />
        })}
      </div>
      <div className="message-input">
        <form className="input-form">
          <div className="group">
            <i className="fas fa-smile"></i>
            <input placeholder="Type a message" onKeyUp={handleKeyUp} onChange={handleOnChange} type="text" value={text} name="message" />
            <i className ="fa fa-paperclip"></i>
            {icons.camera && <i className ="fas fa-camera"></i>}
          </div>
          {icons.microphone && <span className="rounded"><i className="fas fa-microphone"></i></span>}
          {icons.send && <span ref={ref} onClick={sendMessage} className="rounded send"><i className ="fas fa-angle-right"></i></span>}
        </form>
      </div>
    </section>
    </chatContext.Provider>
  )
}

export default Chat
