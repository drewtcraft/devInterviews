import React from 'react';
import {Link, Redirect} from 'react-router-dom'
const axios = require('axios')

export default class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleRegister(e){
    e.preventDefault()

    axios.post('/express/register', {
      username: this.username.value,
      password: this.password.value,
      name: this.name.value,
      email: this.email.value
    })
    .then((data)=>{
      if(data.data === 'username taken'){
        console.log('getting here...')
        this.setState({
          taken: 'username'
        })
      } else if (data.data === 'email taken'){
        this.setState({
          taken: 'email'
        })
      } else {
      window.localStorage.setItem('devInterviewsToken', JSON.stringify(data.data))
        this.props.history.push('/login')

    }

    })
    .catch((err)=>{

    })
  }

  render(){
    let error = (<p className="authError"></p>)

    if(this.state.taken === 'username'){
       error = (<p className="authError">that username is taken!</p>)
    } else if (this.state.taken === 'email'){
       error = (<p className="authError">that email is already registered!</p>)
    }

    return(
      <div className="auth">

        <div className="authTitle">
        <h2>Register</h2>
        <Link to={{pathname: '/login'}} className='link'>Log In</Link>
        {error}
        </div>

        <form onSubmit={this.handleRegister}>
        <input type="text" ref={(ref)=>{this.name = ref}} placeholder='name' name='name' />
        <input type="text" ref={(ref)=>{this.email = ref}} placeholder='email' name='email' />

        <input type="text" ref={(ref)=>{this.username = ref}} placeholder='username' name='username' />
        <input type="password" ref={(ref)=>{this.password = ref}} placeholder='password' name='password' />
        <button className="submitButton" type="Submit">Register</button>
        </form>
      </div>
    )
  }
}
