import React,{useState,useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import PopUp from '../popup/PopUp'
import Flight from '../flight-mode/Flight'
import Theme from '../theme/Theme'
import ChatsMenu from '../chats-menu/Menu'
import StatusMenu from '../status-menu/Menu'
import CallsMenu from '../calls-menu/Menu'
import SideMenu from '../side-menu/SideMenu'
import BottomMenu from '../bottom-menu/BottomMenu'
import ChatBM from '../bottom-menus/ChatBM'
import CallsBM from '../bottom-menus/CallsBM'
import StatusBM from '../bottom-menus/StatusBM'
import {togglePopUp,toggleSideMenu,setFlightMode} from '../../redux/Global/actions'
import './Nav.css'

function Nav() {
    const dispatch = useDispatch();
    const [children, setChildren] = useState({smchildren:null,popupchildren:null,bmchildren:null})
    const [toggle, setToggle] = useState({isNavOpen:false,active:{cls:'active-dark',id:''}})
    const {isPopUpOpen,theme,flightMode,styles, isSideMenuOpen} = useSelector(state => state.global);
    const links = [{name:"CHATS"},{name:"GROUPS"},{name:"STATUS"},{name:"CALLS"}]
    let location = useLocation();

    const handleSideMenu = () => {
      dispatch(toggleSideMenu())
    }

    useEffect(()=>{
      if (location.pathname === '/calls') {
        setChildren({...children, smchildren: <CallsMenu />,bmchildren:<CallsBM />})
      } else if (location.pathname === '/status') {
        setChildren({...children,smchildren:<StatusMenu />,bmchildren:<StatusBM />})
      } else if (location.pathname === '/' || location.pathname === '/groups'){
        setChildren({...children,smchildren:<ChatsMenu/>,bmchildren:<ChatBM />})
      }
    },[location.pathname])

    useEffect(()=>{
      if (styles.theme === 'light'){
        setToggle({...toggle,active:{cls:'active-light'}})
      } else {
        setToggle({...toggle,active:{cls:'active-dark'}})
      }
    },[styles.theme])

    const handleFlightMode = () => {
      if (flightMode) {
        return dispatch(setFlightMode())
      }
      setChildren({...children,popupchildren:<Flight />})
      dispatch(togglePopUp())
    }

    const handleTheme = () => {
      theme==='dark' && setChildren({...children,popupchildren:<Theme text='Light' fac="fas fa-cloud-sun fa-2x"/>})
      theme==='light' && setChildren({...children,popupchildren:<Theme text='Dark' fac="fas fa-cloud-moon fa-2x"/>})
      dispatch(togglePopUp()) 
    }

    const handleClick = (e) => {
      const id = e.target.id
      setToggle({...toggle,active:{...toggle.active,id}})
    }

    return (
        <nav className="nav nav-flex" style={styles.nav}>
            <div className="nav-header">
                <h1 className="nav-logo">WhatsApp</h1>
                <div>
                    { !flightMode ? <span><i onClick={handleFlightMode} className="fas fa-plane "></i></span> : <i onClick={handleFlightMode}>u</i>}
                    <span onClick={handleTheme}>{ theme==='dark' ? <i className="fas fa-sun "></i> : <i className="fas fa-moon "></i> }</span>
                    <span><i className="fas fa-search "></i></span>
                    <span><i onClick={handleSideMenu} className="fa fa-ellipsis-v nav-drop-down"></i></span>
                </div>
            </div>
            <div className="pages">
                {links.map(({name})=>{
                  return <Link key={name} id={name} onClick={handleClick} className={`link ${toggle.active.id===name?toggle.active.cls:""}`}  to={name==="CHATS" ? '/' : `/${name.toLowerCase()}`}>{name}</Link>
                })}
            </div>
            { isPopUpOpen && <PopUp >{children.popupchildren}</PopUp>}
            { isSideMenuOpen && <SideMenu >{children.smchildren}</SideMenu>}
            {true && <BottomMenu>{children.bmchildren}</BottomMenu>}
        </nav>
      ) 
    }

export default Nav


