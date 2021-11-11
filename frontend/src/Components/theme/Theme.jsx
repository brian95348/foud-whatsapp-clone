import React,{useRef,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {togglePopUp,setTheme} from '../../redux/Global/actions'
import './Theme.css'

function Theme({fac,text}) {
    const dispatch = useDispatch();
    const {styles} = useSelector(state => state.global);
    const ref = useRef();
    const weather = useRef();

    useEffect(()=>{
        for (let i = 0; i < ref.current.children.length; i++) {
        ref.current.children[i].style = `color:${styles.color}`
        }
    })

    const handleActivate = () => {
        dispatch(setTheme())
        dispatch(togglePopUp())
    }
    
    const handleCancel = () => {
        dispatch(togglePopUp())
    }

    return (
        <div ref={ref} style={styles}>
        <h3 className="flight-h3">Theme</h3>
        <div ref={weather} className="weather">
            <span style={{color:styles.color}}>{text}</span>
            <i className={fac} style={{color:styles.color}}></i>
        </div>
        <article className="theme-btns">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleActivate}>Activate</button>
        </article>
        </div>
    )
    }

export default Theme
