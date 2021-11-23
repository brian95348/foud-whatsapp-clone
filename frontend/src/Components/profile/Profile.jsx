import React,{useEffect,useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Profile.css'

function Profile(props) {
    const {username,url,lastMessage} = props
    const {styles} = useSelector(state => state.global);
    const ref = useRef();

    useEffect(()=>{
        for (let i = 0; i < ref.current.children.length; i++) {
        ref.current.children[i].style = `color:${styles.color}`
        }
    })
  return (
    <div style={styles} ref={ref}>
        <Link to={`/chat/${username}`}>
      <div className="chat-profile">     
              <div className="img-div">
                <img src={`/assets/Profiles/${url}`} />
              </div>
              <div className="chat-profile-text-wrapper">
                  <div className="chat-profile-text-div">
                    <h2>{username}</h2>
                    <p>{(lastMessage !== null && lastMessage.text) || 'no messages'}</p>
                </div>
              <p>{(lastMessage !== null && lastMessage.createdAt.split('T')[0]) || ''}</p>
              </div>
              
      </div>
      </Link>
    </div>
  )
}

export default Profile
