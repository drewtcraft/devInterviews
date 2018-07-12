import React from 'react';
import {Link, Redirect} from 'react-router-dom'
const axios = require('axios')

//
//
//
//
// if user is logged in, this page should only show a sign out button

export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e){
    e.preventDefault()
    axios.post('/express/login', {
      username: this.username.value,
      password: this.password.value
    })
    .then((data)=>{
      window.localStorage.setItem('devInterviewsToken', data.data)
      this.props.history.push('/')


    })
    .catch((err)=>{
    })
  }

  render(){
    //replace later, if session then
    return(
      <div className="auth">
        <div className="authTitle">
          <h2>Log In</h2>
          <Link to={{pathname:'/register'}} className='link' > Register</Link>
        </div>
        <form onSubmit={(e)=>{this.handleLogin(e)}}>
          <input type="text" ref={(ref)=>{this.username = ref}} placeholder='username' />
          <input type="password" ref={(ref)=>{this.password = ref}} placeholder='password' />
          <button className="submitButton" type="Submit">Log In</button>
        </form>
      </div>
    )
  }
}
