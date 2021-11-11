import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Profile from '../../Components/profile/Profile'
import {fetchProfiles} from '../../redux/Profiles/list/reducer'
import './Chats.css'

function Chats() {
  const { styles } = useSelector(state => state.global);
  const {loading, profiles, profilesError} = useSelector(state => state.profiles);
  const {token,username,userId,profile_username} = useSelector(state => state.userLogin)
  const dispatch = useDispatch();
  const history = useHistory();

  const loginRedirect = () => {
    history.push(`/settings/profile/${username}/create`)
  }
  
  if(!profile_username) loginRedirect()

  useEffect(()=>{
    dispatch(fetchProfiles(profile_username,token))
  },[])

  return (
    <>
    {loading ? <h2>Loading chats...</h2> : profilesError ? <h2>{profilesError}</h2> :
     (
      <div style={{ backgroundColor: styles.nav.backgroundColor }} className="chats-profiles">
           { profiles.length > 0 ? profiles.map((profile) => {
              return <Profile key={profile._id} {...profile}/> 
          }) : <p>empty chats list</p> }
      </div>
    ) 
        } 
    </>
  )
}


export default Chats
