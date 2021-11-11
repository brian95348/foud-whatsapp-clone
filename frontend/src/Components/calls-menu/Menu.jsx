import React,{useEffect,useRef} from 'react'
import {useSelector} from 'react-redux'
import './Menu.css'

function Menu() {
  const {styles} = useSelector(state => state.global);
  const ref = useRef();

  useEffect(()=>{
    for (let i = 0; i < ref.current.children.length; i++) {
      ref.current.children[i].style = `color:${styles.color}`
    }
  })
  return (
    <div ref={ref} className="chats-menu">
      <p>Who can call me?</p>
      <p>Clear call log</p>
      <p>Settings</p>
    </div>
  )
}

export default Menu
