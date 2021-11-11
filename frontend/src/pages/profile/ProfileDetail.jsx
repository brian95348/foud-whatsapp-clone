import React,{useEffect,useRef} from 'react'
import {Link,useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {fetchProfileDetail} from '../../redux/Profiles/detail/reducer'
import './ProfileDetail.css'

function ProfileDetail() {
    const {styles} = useSelector(state => state.global);
    const {loading, profile, profileError} = useSelector(state => state.profileDetail);
    const ref = useRef();
    const dispatch = useDispatch();
    const {username} = useParams();

    useEffect(()=>{
        for (let i = 0; i < ref.current.children.length; i++) {
        ref.current.children[i].style = `color:${styles.color}`
        }
    },[styles])

    useEffect(()=>{
      dispatch(fetchProfileDetail(username))
    },[])

  return (
    <div style={styles} ref={ref}>
       {loading ? <h2>Loading profile...</h2> : profileError ? <h2>{profileError}</h2> : (
         <div className="profile-detail-wrapper">     
              <div className="profile-detail-img-div">
                <img src={`/assets/Profiles/${profile.url}`} alt="not"/>
              </div>
              <div className="profile-detail-text-wrap">
                <h3 className="profile-detail-username">{`brian`}</h3>  
              <p style={{color:'rgba(7, 194, 85, 0.788)'}}>About</p>    
              <div className="status">
                <p>{profile.status}</p>
                <p>Otober 15</p>
                </div>  
                <div>
                  <p style={{color:'red'}} ><i className="fas fa-ban"></i>   Block</p>
                  <p style={{color:'red'}} ><i className="fa fa-thumbs-down"></i>    Report contact</p>
                </div> 
              </div>
              
          </div>
       )}       
    </div>
  )
}

export default ProfileDetail
