import React,{useEffect,useRef } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfileDetail} from '../../redux/Profiles/detail/reducer'
import './Settings.css'

function Settings() {
    const {styles} = useSelector(state => state.global);
    const {token, profile_username } = useSelector(state => state.userLogin);
    const {profile} = useSelector(state => state.profileDetail);
    const ref = useRef();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        for (let i = 0; i < ref.current.children.length; i++) {
        ref.current.children[i].style = `color:${styles.color}`
        }
    },[styles])

    useEffect(()=>{
      dispatch(fetchProfileDetail(profile_username,token))
    },[])

  return (
    <div style={{backgroundColor:styles.nav.backgroundColor,color:styles.nav.color}} className="settings-wrapper" >
      <div  className="settings-header">
          <i onClick={()=>history.push('/')} style={{color:styles.nav.color}} className="far fa-arrow-alt-circle-left"></i>
          <h2>Settings</h2>
      </div>
      <div ref={ref} style={styles}>
      <Link to={`/settings/profile/${profile.username}`}>
      <div className="settings-profile">     
              <div className="img-div">
                <img src={`/assets/Profiles/${profile.url}`} />
              </div>
              <div className="text-div">
                  <h2>{profile.username}</h2>
                  <p>{profile.status}</p>
              </div>
      </div>
       </Link>
      <div className="settings-body">
          <div className="settings-item">
              <i className="fas fa-key"></i>
              <div className="settings-item-text">
                  <h4>Account</h4>
                  <p>Privacy, security, change number</p>
              </div>
          </div>
          <div className="settings-item">
              <i className="fas fa-comment-alt"></i>
              <div className="settings-item-text">
                  <h4>Chats</h4>
                  <p>Theme, wallpapers, chat history</p>
              </div>
          </div>
          <div className="settings-item">
              <i className="fas fa-bell"></i>
              <div className="settings-item-text">
                  <h4>Notifications</h4>
                  <p>Message, group, call tones</p>
              </div>
          </div>
          <div className="settings-item">
              <i className="fas fa-box-open"></i>
              <div className="settings-item-text">
                  <h4>Storage and data</h4>
                  <p>Network usage, auto-download</p>
              </div>
          </div>
          <div className="settings-item">
              <i className="far fa-question-circle"></i>
              <div className="settings-item-text">
                  <h4>Help</h4>
                  <p>Help center, contact us, privacy policy</p>
              </div>
          </div>
          <div className="settings-item">
              <i className="fas fa-user-friends"></i>
              <div className="settings-item-text">
                  <h4>Invite a friend</h4>
                  <p>Help center, contact us, privacy policy</p>
              </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Settings
