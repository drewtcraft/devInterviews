import React from 'react';
import Question from './Question.jsx'
import {Route, Link} from 'react-router-dom'
import './styles/interviewThread.css'

export default class Interview extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questions: []
    }

  }

  componentWillMount(){
    console.log('firing')
    this.setState({
      questions: this.props.questions
    })
  }

  render(){

  let postedBy = (<div></div>)
      let questions = (<div></div>)

  if (this.props.interview && this.props.user  !== undefined) {

    postedBy = <p className="label">posted by {this.props.interview.username} at {this.props.interview.post_date}</p>

    let editButton = (<div></div>)
    let deleteButton = (<div></div>)

    if(this.props.user.user_id === this.props.interview.user_id){
      editButton = (<Link to={{pathname: `/interview/${this.props.interview.id}/edit`}} className="edit">edit</Link>)
      deleteButton = (<div onClick={(e)=>{this.props.delete(this.props.interview.id, e)}} className="delete"> delete</div>)
    }
    if(this.props.questions){
      console.log(this.props.questions)
     questions = this.props.questions.map((el, i)=>{
      return (
        <Question key={i} title={el.title} content={el.content}
          handleVote={this.props.handleVote} id={el.id} score={el.score} />
      )
    })
   }

    let tags = <p className="littleMessage">no tags to display</p>

    if(this.props.tags.length>0){
     tags = this.props.tags.map((el, i)=>{
      return (<div className="tag" key={i}>{el.name}</div>)
    })
   }

    return (
      <div className="interview">
        <div className="interviewHeader">
          <h2>{this.props.interview.title}</h2>
          {postedBy}
          <div className="tagsContainer">
          <p className="label">tagged with:</p>
            {tags}
          </div>
        </div>
        {editButton}
        {deleteButton}


        <p className="label">position</p>
        <p className="interviewField">{this.props.interview.position}</p>
        <p className="label">industry</p>
        <p className="interviewField">{this.props.interview.industry}</p>
        <p className="label">summary</p>
        <p className="interviewField">{this.props.interview.summary}</p>

        <p className="label">questions</p>
        <div className="questionContainer">
          {questions}
        </div>



      </div>
    )
  }
  else {
  return (
    <div className='interview'>

    </div>
  )
}
}

}
