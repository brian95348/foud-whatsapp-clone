import React,{useEffect,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {togglePopUp,setFlightMode} from '../../redux/Global/actions'
import './Flight.css'

function Flight() {
    const dispatch = useDispatch();
    const {styles} = useSelector(state => state.global);
    const ref = useRef();

    useEffect(()=>{
        for (let i = 0; i < ref.current.children.length; i++) {
        ref.current.children[i].style = `color:${styles.color}`
        }
    })

    const handleActivate = () => {
        dispatch(setFlightMode())
        dispatch(togglePopUp())
    }
    
    const handleCancel = () => {
        dispatch(togglePopUp())
    }

    return (
        <div className="flight-wrapper" ref={ref} style={styles}>
        <h3 className="flight-h3">Airplane Mode</h3>
        <p className="flight-p">While Airplane mode is On, you will not be able to send/receive messages</p>
        <article className="flight-btns">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleActivate}>Activate</button>
        </article>
        </div>
    )
    }

export default Flight
