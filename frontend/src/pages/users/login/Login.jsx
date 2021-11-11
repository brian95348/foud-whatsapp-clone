import React,{useState,useEffect,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Redirect,useHistory} from 'react-router-dom'
import {userLogin} from '../../../redux/Users/login/reducer'
import './Login.css'

const Login = () => {
    const dispatch = useDispatch();
    const {isloggingIn,isloggedIn,loginError} = useSelector(state => state.userLogin)
    const [username,setUsername] = useState('')
    const ref = useRef();
    const history = useHistory();

    useEffect(()=>{
        if (isloggedIn) {
            setUsername('')
            // window.location.replace('/')
        }    
        },[isloggedIn,loginError])

    useEffect(()=>{
        ref.current.focus()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({username}))
    }
        
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUsername(value)
    }
    return (
        <>
        {isloggingIn ? <h2>Logging in...</h2> : loginError ? <h2>{loginError}</h2> : isloggedIn ? <Redirect to="/" />: (
        <section className="outer-wrapper">
        <section className="login-form-wrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-item">
                    <label htmlFor="username">username:</label>
                    <input ref={ref} type="text" id="username" required name="username" value={username} onChange={handleChange}/>
                     <div className="login-button-wrapper">
                    <button type="submit">Login</button>
                </div>
                </div>           
        </form>
        <div className="sign-up">
            <p>Don't have an account? </p>
            <button onClick={()=>history.push('/register')}>Sign Up</button>
        </div>
        </section>     
        </section>
        )
        }
        </>
    )
}

export default Login