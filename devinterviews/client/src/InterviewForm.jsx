import React from 'react';
import CodeEditor from './CodeEditor.jsx'
import {Route} from 'react-router-dom'
import {convertToRaw} from 'draft-js'
import './styles/interviewThread.css'


const axios = require('axios')

export default class InterviewForm extends React.Component {

  constructor(props){
    super(props)
    this.state={
      title: '',
      position: '',
      industry: '',
      summary: '',
      questions: [{question: '', answer: ''}],
      tags: []
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.addTag = this.addTag.bind(this)

  }

  addQuestion(e){
    e.preventDefault()
    this.setState((prevState)=>{
      return {
        questions: prevState.questions.concat([{
          question: '',
          answer: ''
        }])}
    })
  }

  editQuestion(i, e){
    this.setState((prevState)=>{
      return {
        questions: prevState.questions.map((_el, _i)=>{
          if (i !== _i) return _el
          return {
            question: JSON.stringify({data: convertToRaw(this.question.state.editorState.getCurrentContent())}),
            answer: _el.answer
          }
        })
      }
    })
  }

  editAnswer(i, e){
    console.log(i)
    this.setState((prevState)=>{
      return {
        questions: prevState.questions.map((_el, _i)=>{
          if (i !== _i) return _el
          return {
            question: _el.question,
            answer: JSON.stringify({data: convertToRaw(this.answer.state.editorState.getCurrentContent())})
          }
        })
      }
    })
  }

  deleteQuestion(i, e){
    e.preventDefault()
    this.setState((prevState)=>{
      return {
        questions: prevState.questions.filter((_el, _i)=>i!==_i)
      }
    })
  }

  deleteTag(i, e){
    this.setState((prevState)=>{
      return {
        tags: prevState.tags.filter((_el, _i)=>i!==_i)
      }
    })
  }

  async addTag(e){
    e.preventDefault()
    await this.setState((prevState)=>{
      return {
        tags: prevState.tags.concat(this.tag.value.toLowerCase())
      }
    })
    this.tag.value = ''
  }


  render() {

    if(this.props.user !== undefined){

    const questions = this.state.questions.map((el, i)=>{
      return (
        <div className="quest" key={i}>
          <div className="labeledRow">
            <p className="label">question</p>
            <CodeEditor readOnly={false} content={undefined} type="text" ref={(ref)=>{this.question = ref}} onChange={(e)=>{this.editQuestion(i, e)}} />

          </div>
          <div className="labeledRow">
            <p className="label">answer</p>
            <CodeEditor readOnly={false} content={undefined} type="text" ref={(ref)=>{this.answer = ref}} onChange={(e)=>{this.editAnswer(i, e)}} />

            </div>
          <button className="generalButton rightButton" onClick={(e)=>{this.deleteQuestion(i, e)}}>delete question</button>
        </div>
      )
    })

      let tags = <p className="littleMessage">no tags to display</p>

      if(this.state.tags.length > 0){
     tags = this.state.tags.map((el, i)=>{
      return (
        <div className="tagTag" key={i}>
          <p>{el}</p>
          <button className="generalButton tagButton" onClick={(e)=>{this.deleteTag(i, e)}}>X</button>
        </div>
      )
    })
   }

    return (
      <div className="section">

        <h2 className="pageTitle">Post Interview</h2>

        <form onSubmit={(e)=>{this.props.postInterview(

          {
            interview: {
              user_id: this.props.user.user_id,
              title: this.title.value,
              username: this.props.user.username,
              position: this.position.value,
              industry: this.industry.value,
              summary: this.summary.value,
              score: 0
            },

            questions: this.state.questions,
            tags: this.state.tags
          }, e

        )}}>

          <input type="text" ref={(ref)=>{this.title = ref}}
            placeholder="title this post"/>
          <input type="text" ref={(ref)=>{this.position = ref}}
            placeholder="position title"/>
          <input type="text" ref={(ref)=>{this.industry = ref}}
            placeholder="industry"/>
          <textarea type="text" ref={(ref)=>{this.summary = ref}}
            placeholder="interview summary"/>

          <h3 className="label">questions asked in interview</h3>
          {questions}
          <button className="generalButton" onClick={this.addQuestion}>add new question</button>
          <div className="tagsContainer">
          <p className="label">tags</p>
          {tags}
          </div>
                  <form onSubmit={this.addTag}>
        <input type='text' ref={(ref)=>{this.tag = ref}} placeholder="add new tag"/>
        <button className="generalButton" onClick={this.addTag}>add tag</button>
        </form>

          <button className="submitButton" type="Submit">Post Interview</button>
        </form>





      </div>
    )}
    return(<div> you must be logged in to post!</div>)
  }
}
