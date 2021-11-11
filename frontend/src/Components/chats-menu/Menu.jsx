import React,{useRef,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {toggleSideMenu} from '../../redux/Global/actions'
import './Menu.css'

function Menu() {
  const {styles} = useSelector(state => state.global);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    for (let i = 0; i < ref.current.children.length; i++) {
      ref.current.children[i].style = `color:${styles.color}`
    }
  })

  const handleClick = () => {
    dispatch(toggleSideMenu())
  }

  return (
    <div ref={ref}  style={styles} className="chats-menu">
      <p  >FMMods</p>
      <p>Message Schedule</p>
      <p>Auto Reply</p>
      <p>Restart WhatsApp</p>
      <p>Message a number</p>
      <p>New group</p>
      <p>New broadcast</p>
      <p>Linked devices</p>
      <p>Starred devices</p>
      <Link onClick={handleClick} to="/settings">Settings</Link>
    </div>
  )
}

export default Menu
