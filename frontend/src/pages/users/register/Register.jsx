import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {userRegistration} from '../../../redux/Users/register/reducer'
import './Register.css'

const Register = () => {
    const [user,setUser] = useState({
        username:'',
        email:''
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const {isRegistered,isRegistering,registrationError} = useSelector(state => state.userRegistration)

    const userSuccess = () => {
            history.push('/login')
    }

    useEffect(()=>{
        if (isRegistered) {
            userSuccess()
        }
        if (registrationError) {
            console.log(registrationError)
        }
    },[isRegistered,registrationError])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userRegistration(user))
        setUser({username:'',email:''})         
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({...user,[name]:value})
    }
    return (
        <> {isRegistering ? <h2>Registering user...</h2> :registrationError ? <h2>{registrationError}</h2> : (
        <section className="outer">
        <section className="register-form-wrapper">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-item">
                <label htmlFor="username">username:</label>
                <input className="register-input" type="text" id="username" required name="username" value={user.username} onChange={handleChange}/> 
            </div>
            <div className="register-form-item">
                <label htmlFor="email">email:</label>
                <input className="register-input" type="text" id="email" required value={user.email} name="email" onChange={handleChange}/>
            </div>
            <div className="register-button-wrapper">
                <button type="submit">Sign up</button>
            </div>
            
        </form>
        </section>
        </section>
        )}
        </>
    )
}

export default Register