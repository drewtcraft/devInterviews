import React from 'react';
import InterviewForm from './InterviewForm.jsx'
import PostList from './PostList.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Thread from './Thread.jsx'
import Login from './Login.jsx'
import QuestionList from './QuestionList.jsx'
import QuestionDetail from './QuestionDetail.js'
import Register from './Register.js'
import InterviewEdit from './InterviewEdit.jsx'
import QuestionEdit from './QuestionEdit.js'
import { Route, Switch} from 'react-router-dom';
import { withRouter  } from 'react-router';
import './App.css';
const axios = require('axios');


class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      user: undefined,
      interview: {},
      interviews: [],
      questions: [],
      allQuestions: [],
      comments: [],
      comment_vote_info: []
    }

    this.getInterview = this.getInterview.bind(this)
    this.getAllInterviews = this.getAllInterviews.bind(this)
    this.postInterview = this.postInterview.bind(this)
    this.updateOnURLChange = this.updateOnURLChange.bind(this)
    this.postComment = this.postComment.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.checkToken = this.checkToken.bind(this)
    this.getAllQuestions = this.getAllQuestions.bind(this)
    this.getQuestionByID = this.getQuestionByID.bind(this)
    this.destroyToken = this.destroyToken.bind(this)
    this.editInterview = this.editInterview.bind(this)
    this.deleteInterview = this.deleteInterview.bind(this)
  }


  componentWillMount(){

    this.checkToken()

  }


  componentDidUpdate(prevProps){
    if (this.props.location !== prevProps.location) {
          this.checkToken()
        }
  }

  checkToken(){
    if(window.localStorage.getItem('devInterviewsToken')){

      const tokenObject = window.localStorage.getItem('devInterviewsToken')

      axios.post('/express/token', {
        token: tokenObject
      })
        .then((user)=>{
          this.setState({
            user: user.data
          })
          this.updateOnURLChange()
        })
        .catch(()=>{
          this.setState({
            user: undefined
          })
          this.updateOnURLChange()
        })
    }
  }


  updateOnURLChange(){

    const route = this.props.history.location.pathname

    switch(route.slice(0, 4)){
      case '/':
        this.getAllInterviews(this.state.user)
        break;
      case '/int':
        this.getInterview(route.replace('/interview/', '').replace('/edit', ''), this.state.user)
        break;
      case '/que':
        this.getAllQuestions(this.state.user)
        break;
      case '/qDe':
        this.getQuestionByID(route.replace('/qDetail/', ''), this.state.user)
        break;
      case '/sor':
        //get by tag
      default:

        break;
    }

  }

  getQuestionByID(id, user){
    console.log('fetching question!')
    if(user != undefined){
      axios.post(`/express/questions/${id}`, {user_id: this.state.user.user_id})
        .then((data)=>{
          console.log('this one',data.data)
          this.setState({
            question: data.data.question,
            comments: data.data.comments,
            question_comment_vote_info: data.data.vote_info

          })
        })
    }
    else{
    axios.get(`/express/questions/${id}`)
      .then((data)=>{
        this.setState({
          question: data.data.question,
          comments: data.data.comments
        })
      })
    }
  }

  getAllQuestions(user){

    if(user != undefined){
      axios.post('/express/questions', {user_id: this.state.user.user_id})
        .then((data)=>{
          console.log(data.data)
          this.setState({
            allQuestions: data.data.questions,
            questions_vote_info: data.data.vote_info
          })
        })


      } else {
        axios.get('/express/questions')
          .then((data)=>{
            console.log('this data', data.data.questions)
            this.setState({
              allQuestions: data.data.questions
            })
          })
      }
  }

  getAllInterviews(user){
    if(user != undefined){
      axios.post('/express/interviews', {user_id: this.state.user.user_id})
        .then((data)=>{
          console.log(data.data)
          this.setState({
            interviews: data.data.interviews,
            vote_info: data.data.vote_info,
            tags: data.data.tags
          })
        })


      } else {
        axios.get('/express/interviews')
          .then((data)=>{
            this.setState({
              interviews: data.data.interviews,
              tags: data.data.tags
            })
          })
      }
  }

  getInterview(id, user){

    //get question votes
    if(user != undefined){
      axios.post(`/express/interviewWithVotes/${id}`, {user_id: this.state.user.user_id})
        .then((data)=>{
          console.log('comment info', data.data)
          this.setState({
            interview: data.data.interview,
            comment_vote_info: data.data.vote_info
          })
        })
    }
    else{
      axios.get(`/express/interview/${id}`)
        .then((data)=>{
          this.setState({
            interview: data.data
          })
        })
      }
  }

  postInterview(interview, e){
    e.preventDefault()
    axios.post('/express/interview', interview)
      .then((id)=>{
        console.log('the returned id is', id.data.id)
        this.props.history.push(`/interview/${id.data.id}`)
      })
  }

  postComment(comment, e){
    console.log('shitbird')
    if (e.which == '13') {
        e.preventDefault();
      }
    e.preventDefault()
    axios.post('/express/comment', comment)
      .then(()=>{
        console.log('magic carpet ride')
        this.props.history.push(this.props.history.location.pathname)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  deleteInterview(id, e){
    e.preventDefault()
    axios.delete(`/express/interview/${id}`)
      .then(()=>{
        this.props.history.push('/')
      })
      .catch((err)=>{
        console.log(err)
      })
  }


  handleVote(voteInfo, e){
    console.log('handleVote', voteInfo)

    e.preventDefault()

    switch(voteInfo.type){
      case 'i':
        axios.post(`/express/interview/${voteInfo.type_id}`, {
          user_id: this.state.user.user_id,
          type: voteInfo.type,
          type_id: voteInfo.type_id,
          amount: voteInfo.amount
        })
        break;
      case 'q':
        axios.post(`/express/question/${voteInfo.type_id}`, {
          user_id: this.state.user.user_id,
          type: voteInfo.type,
          type_id: voteInfo.type_id,
          amount: voteInfo.amount
        })
        break;
      case 'c':
        axios.post(`/express/comment/${voteInfo.type_id}`, {
          user_id: this.state.user.user_id,
          type: voteInfo.type,
          type_id: voteInfo.type_id,
          amount: voteInfo.amount
        })
        break;
      case 'qc':
        axios.post(`/express/questionComments`, {
          user_id: this.state.user.user_id,
          type: voteInfo.type,
          type_id: voteInfo.type_id,
          amount: voteInfo.amount
        })
        break;
      default:
        console.log('something bad happened with the voting...')
        break;
    }
  }

  destroyToken(){
    window.localStorage.removeItem('devInterviewsToken')
    this.setState({
      user: undefined
    })
  }

  editInterview(id, interview, e){
    e.preventDefault()
    axios.put(`/express/interview/${id}`, interview)
      .then(()=>{
        this.props.history.push(`/interview/${id}`)
      })
  }

  render() {

    const currentState = this.state

    return (
      <div className="App">

        <Header user={this.state.user} destroy={this.destroyToken} />

        <Switch>

          <Route exact path="/post" render={()=>{return(
            <InterviewForm
              postInterview={this.postInterview}
              user={this.state.user}
               />
          )}} />

          <Route exact path="/" render={()=>{return(
            <PostList
              getInterview={this.getInterview}
              posts={this.state.interviews}
              handleVote={this.handleVote}
              votes={this.state.vote_info}
              tags={this.state.tags}
               />
          )}} />

          <Route exact path="/questions" render={()=>{return(
            <QuestionList
              getQuestion={this.getQuestion}
              questions={this.state.allQuestions}
              handleVote={this.handleVote}
              votes={this.state.questions_vote_info}
               />
          )}} />

          <Route exact path="/qDetail/:id" render={()=>{return(
            <QuestionDetail
              postComment={this.postComment}
              question={this.state.question}
              comments={this.state.comments}
              user={this.state.user}
              handleVote={this.handleVote}
              votes={this.state.question_comment_vote_info}
 />
          )}} />

          <Route exact path="/interview/:id" render={()=>{return(
            <Thread
              postComment={this.postComment}
              interview={this.state.interview.interview}
              questions={this.state.interview.questions}
              tags={this.state.interview.tags}
              comments={this.state.interview.comments}
              user={this.state.user}
              handleVote={this.handleVote}
              votes={this.state.comment_vote_info}
              delete={this.deleteInterview}
 />
          )}} />

          <Route exact path="/interview/:id/edit" render={()=>{return(
            <InterviewEdit
              interview={this.state.interview.interview}
              questions={this.state.interview.questions}
              tags={this.state.interview.tags}
              submitEdits={this.editInterview}
              user={this.state.user}
 />
          )}} />

          <Route exact path='/login' component={Login} history={this.props.history} />
          <Route exact path='/register' component={Register} history={this.props.history} />


        </Switch>
        <Footer></Footer>

      </div>
    );
  }
}

export default withRouter(App);
