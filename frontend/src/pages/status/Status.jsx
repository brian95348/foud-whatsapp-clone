import React,{useEffect,useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchProfileDetail} from '../../redux/Profiles/detail/reducer'
import './Status.css'

function Status() {
  const {styles} = useSelector(state => state.global);
  const {profile, profileError} = useSelector(state => state.profileDetail);
  const {token, profile_username } = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(()=>{
      dispatch(fetchProfileDetail(profile_username,token))
    },[])

  return (
    <section ref={ref} style={styles} className="status-home">
      <div className="status-profile">     
              <div className="img-div">
                <img src={`/assets/Profiles/${profile.url}`} alt="image-not-found"/>
              </div>
              <div className="text-div">
                  <h2>My Status</h2>
                  <p>Tap to add status update</p>
              </div>
      </div>
      <div className="status-icon-div">
        <i  className="fas fa-plus-circle fa-2x"></i>
      </div>
      <hr/>   
      <div className="text">
        <p>Recent updates</p>
      </div>
      <hr/>
    </section>
  )
}

export default Status
