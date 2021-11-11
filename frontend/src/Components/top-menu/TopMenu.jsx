import React from 'react'
import {useSelector} from 'react-redux'
import './TopMenu.css'

function TopMenu(props) {
  const {styles} = useSelector(state => state.global);
  return (
      <div style={styles} className="top-menu-wrapper">
        {props.children}
      </div>
  )
}

export default TopMenu

