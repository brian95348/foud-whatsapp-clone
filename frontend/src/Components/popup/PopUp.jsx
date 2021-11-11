import React from 'react'
import {useSelector} from 'react-redux'
import './PopUp.css'

function PopUp({children}) {
  const {styles} = useSelector(state => state.global);
  return (
    <section style={styles} className="popup-element">
      <div className="popup-wrapper">
        {children}
      </div>
      
    </section>
  )
}

export default PopUp

