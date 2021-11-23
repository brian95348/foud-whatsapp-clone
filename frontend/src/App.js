import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Chats from './pages/chats/Chats'
import ProfileDetail from './pages/profile/ProfileDetail'
import Settings from './pages/settings/Settings'
import Chat from './pages/chat/Chat'
import Status from './pages/status/Status'
import Calls from './pages/calls/Calls'
import Profile from './pages/profile/Profile'
import CreateProfile from './pages/profile/Create'
import Groups from './pages/groups/Groups'
import Nav from './Components/nav/Nav'
import Login from './pages/users/login/Login'
import Register from './pages/users/register/Register'
import {useSelector} from 'react-redux'

const PrivateRoute = props => {
  const {isloggedIn} = useSelector(state => state.userLogin)
  return (
    <Route {...props}>{isloggedIn ? props.children: <Redirect to="/login" />}</Route>
  )
}

function App() {

  return (
    <Router>  
      <div className='App' >
      <Switch>
        <PrivateRoute path="/" exact ><Nav /><Chats /></PrivateRoute>
        <PrivateRoute path="/groups" exact ><Nav /><Groups /></PrivateRoute>
        <PrivateRoute path="/status" exact ><Nav /><Status /></PrivateRoute>
        <PrivateRoute path="/calls" exact ><Nav /><Calls /></PrivateRoute>
        <PrivateRoute path="/settings" exact ><Settings /></PrivateRoute>
        <PrivateRoute path="/settings/profile/:username" exact ><Profile /></PrivateRoute>
        <PrivateRoute path="/profile/:profileUsername" exact ><ProfileDetail /></PrivateRoute>
        <PrivateRoute path="/settings/profile/:username/create" exact ><CreateProfile /></PrivateRoute>
        <PrivateRoute path="/chat/:profileUsername" exact children={<Chat />}></PrivateRoute>
        <Route path="/register" exact ><Register /></Route>
        <Route path="/login" exact ><Login /></Route>
      </Switch>
      </div>
    </Router>
  )
}

export default App


