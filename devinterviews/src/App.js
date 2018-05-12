import React from 'react';
import InterviewForm from './InterviewForm.js'
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={

    }
  }

  render() {
    return (
      <div className="App">
        <InterviewForm />
      </div>
    );
  }
}

export default App;
