import React from 'react'
import {useSelector} from 'react-redux'
import './SideMenu.css'

function SideMenu({children}) {
  const {styles} = useSelector(state => state.global);
  return (
    <section  className="side-menu">
      <div key="side-menu" style={styles} className="side-menu-wrapper">
        {children}
      </div>
      
    </section>
  )
}

export default SideMenu

