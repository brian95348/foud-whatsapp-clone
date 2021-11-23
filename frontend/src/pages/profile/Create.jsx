import React, {useEffect,useState,useRef} from 'react'
import {useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {createProfile} from '../../redux/Profiles/create/reducer'
import './Create.css'

function CreateProfile() {

  const {token,userId} = useSelector(state => state.userLogin)
  const {styles} = useSelector(state => state.global);
  const {creating, created, createError} = useSelector(state => state.createProfile);
  const [profile,setProfile] = useState({user_id:userId,username:'',status:'',image:''})
  const defaultURL = '/assets/Profiles/index.jpg'
  const [selectedImage, setSelectedImage] = useState(null)
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
      for (let i = 0; i < ref.current.children.length; i++) {
      ref.current.children[i].style = `color:${styles.color}`
      }
  },[styles])

  useEffect(()=>{
        selectedImage && setProfile({...profile,image:selectedImage})
    },[selectedImage])

    const success = ()=>{
      history.push('/')
    }

  useEffect(()=>{
        if (created) {
            setProfile({username:'',status:'',url:'index.jpg',image:''})
            setSelectedImage(null)
            success()
        }    
  },[created,createError])

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setProfile({...profile,[name]:value})
  }
  
  const handleSubmit = (e) => {
    const form = new FormData();
    for (let key in profile) {
            form.append(key, profile[key])
        } 
      dispatch(createProfile(form,token))
    }
  
  const handleImageChange = (e) => {
      const value = e.target.files[0]
      setSelectedImage(value)
  }


  return (
    <>
    {creating ? <h2>Creating Profile</h2> : createError ? <h2>{createError}</h2> : (
    <div className="create-wrapper" style={styles}>
      <div style={{backgroundColor:styles.nav.backgroundColor,color:styles.nav.color}} className="profile-header">
          <h2>Create Profile</h2>
      </div>
      <div ref={ref} style={styles} >
       <div className="photo-div">
         <img src={selectedImage ? (URL.createObjectURL(selectedImage)): defaultURL} alt="not"/>
       </div>
       <div id="input-file-div">
        <input type="file" name="image"  onChange={handleImageChange}/>
       </div>
       <div className="create-name">
         <i className="fas fa-user"></i>
         <div className="text-outer" >
           <div className="text-inner">
             <div className="text">
               <p>Name</p>
               <input required className="text-inputs" onChange={handleChange} type="text" name="username" value={profile.username}/>
             </div>
           </div>
           <p>This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
         </div>
       </div>
       <div className="create-about">
         <i  className="fas fa-info-circle"></i>
         <div className="create-about-outer">
             <div className="create-about-text">
               <p>About</p>
               <input className="text-inputs" required onChange={handleChange} type="text" name="status" value={profile.status}/>   
           </div>
         </div>
       </div>
       <div className="create-phone">
         <i className="fas fa-phone-alt"></i>
         <div>
             <div className="create-phone-text">
               <p>Phone</p>
               <h5>+27657247493</h5>
             </div>
           </div>
       </div>
       <div className="create-button-div">
         <button  type="submit" onClick={handleSubmit}>Create</button>
       </div>
       </div>
    </div>
    )}
    </>
  )
}

export default CreateProfile
