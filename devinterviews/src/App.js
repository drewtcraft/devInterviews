import React from 'react';
import InterviewForm from './InterviewForm.js'
import Header from './Header.js'
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      user: true,
      interview: {},
      comments: []


    }
  }

  render() {
    return (
      <div className="App">
      <Header user={this.state.user} />

      </div>
    );
  }
}

export default App;
