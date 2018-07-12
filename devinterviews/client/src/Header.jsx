import React from 'react';
import {Link} from 'react-router-dom';
import './styles/header.css'

export default function Header (props) {

  const username = props.user ? props.user.username : undefined

  const userLoggedOut = (
      <div className="headerButtons">
        <Link to={{pathname: '/'}}  className="headerLink" >interviews</Link>
        <div className="userCentricButtons">
          <Link to={{pathname: '/login'}} className="smallHeaderLink">Log In</Link>
          <Link to={{pathname: '/register'}} className="smallHeaderLink">Register</Link>
        </div>
      </div>
    )

  const userLoggedIn = (
      <div className="headerButtons">
        <Link to={{pathname: '/post'}} className="headerLink" >post interview</Link>
        <Link to={{pathname: '/'}} className="headerLink" >interviews</Link>
        <div className="userCentricButtons">
          <a>{username}</a>
          <a onClick={props.destroy}>logOut</a>
        </div>
      </div>
    )

  const headerButtons = props.user !== undefined ? userLoggedIn : userLoggedOut

  return (
    <div className="header">
      <Link className="headerText" to={{pathname:'/'}}>devInterviews</Link>
      {headerButtons}
    </div>
  )
}
