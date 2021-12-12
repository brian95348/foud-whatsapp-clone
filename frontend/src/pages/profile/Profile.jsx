import React, {useEffect,useState,useRef} from 'react'
import {useParams,Redirect,useHistory} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {fetchProfileDetail} from '../../redux/Profiles/detail/reducer'
import {updateProfile} from '../../redux/Profiles/update/reducer'
import './Profile.css'

function Profile() {
  const {styles} = useSelector(state => state.global);
  const {loading,profile, profileError} = useSelector(state => state.profileDetail);
  const {isUpdated } = useSelector(state => state.profileUpdate);
  const [formProfile, setFormProfile] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)
  const {token} = useSelector(state => state.userLogin);
  const dispatch = useDispatch();
  const {username} = useParams()
  const history = useHistory();
  const ref = useRef();
  const nameRef = useRef();
  const statusRef = useRef();
  const [showBtn, setShowBtn] = useState(false)

  useEffect(()=>{
     dispatch(fetchProfileDetail(username,token))
  },[])

  useEffect(()=>{
    const {user_id, username, status, url} = profile
    setFormProfile({user_id,username,status,oldURL:url,image:''})
  },[profile])

    const handleEdit = (e) => {
      setShowBtn(true)
      const style = "color:black;backgroundColor:white;"
      if (e.target.id === nameRef.current.name) {
        nameRef.current.style = style
        nameRef.current.focus()
      } else if (e.target.id === statusRef.current.name) {
        statusRef.current.style = style
        statusRef.current.focus()
      }
    }

    const handleChange = (e) => {
      const value = e.target.value
      const name = e.target.name
      setFormProfile({...formProfile,[name]:value})
  }

    const handleSubmit = (e) => {
      const form = new FormData();
      for (let key in formProfile) {
          form.append(key, formProfile[key])
      } 
      dispatch(updateProfile(username,form,token))
    }
    
    const handleImageChange = (e) => {
      const value = e.target.files[0]
      setSelectedImage(value)
      setShowBtn(true)
  }

  useEffect(()=>{
        selectedImage && setFormProfile({...formProfile,image:selectedImage})
    },[selectedImage])
     

useEffect(()=>{
  if (isUpdated) {
      setFormProfile({})
      setSelectedImage(null)
      return <Redirect to={`/settings/profile/${username}`} />
   }     
  },[isUpdated])

  return (
    <>
    {loading ? <h2>Loading</h2> : profileError ? <h2>{profileError}</h2> : (
    <div className="profile-wrapper" style={styles}>
      <div style={{backgroundColor:styles.nav.backgroundColor,color:styles.nav.color}} className="profile-header">
          <i onClick={()=> history.push("/") } style={{color:styles.nav.color}} className="far fa-arrow-alt-circle-left"></i>
          <h2>Profile</h2>
      </div>
      <div ref={ref} style={styles} >
       <div className="photo-div">
         <img src={selectedImage ? (URL.createObjectURL(selectedImage)): profile ? `/assets/Profiles/${profile.url}`: ''} />
         <div id="input-file-div">
        <input type="file" name="image"  onChange={handleImageChange}/>
       </div>
       </div>
       <div className="profile-name">
         <i className="fas fa-user"></i>
         <div className="text-outer" >
           <div className="text-inner">
             <div className="text">
               <p>Name</p>
               <input onChange={handleChange} ref={nameRef} style={{color:styles.color,backgroundColor:styles.backgroundColor}} type="text" name="username" value={formProfile ? formProfile.username:''}/>
             </div>
              <i onClick={handleEdit} id="username" className="far fa-edit"></i>
           </div>
           <p>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
         </div>
       </div>
       <div className="profile-about">
         <i  className="fas fa-info-circle"></i>
         <div className="profile-about-outer">
             <div className="profile-about-text">
               <p>About</p>
               <input style={{color:styles.color,backgroundColor:styles.backgroundColor}} onChange={handleChange} ref={statusRef} type="text" name="status" value={formProfile ? formProfile.status: ''}/>   
           </div>
           <i onClick={handleEdit} id="status" className="far fa-edit"></i>
         </div>
       </div>
       <div className="profile-phone">
         <i className="fas fa-phone-alt"></i>
         <div>
             <div className="profile-phone-text">
               <p>Phone</p>
               <h5>+27657247493</h5>
             </div>
           </div>
       </div>
       <div className="div-btn" id={showBtn ? "div":""}>
         <button  type="submit" onClick={handleSubmit}>Update</button>
       </div>
       </div>
    </div>
    )}
    </>
  )
}

export default Profile
