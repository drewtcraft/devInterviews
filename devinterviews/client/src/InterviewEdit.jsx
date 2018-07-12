
import React from 'react';
import CodeEditor from './CodeEditor.jsx'
import {Route} from 'react-router-dom'
import {convertFromRaw} from 'draft-js'
import './styles/interviewThread.css'


const axios = require('axios')

export default class InterviewEdit extends React.Component {

  constructor(props){
    super(props)
    this.state={
      title: '',
      position: '',
      industry: '',
      summary: '',
      questions: [{id: '', question: '', answer: ''}],
      tags: []
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.addTag = this.addTag.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  componentWillMount(){
    this.setState({
      title: this.props.interview.title,
      position: this.props.interview.position,
      industry: this.props.interview.industry,
      summary: this.props.interview.summary,
      questions: this.props.questions
    })

    this.title = this.props.interview.title
    console.log(this.title)

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
            question: JSON.stringify({data: (this.question.state.editorState.getCurrentContent())}),
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
            answer: JSON.stringify({data: (this.answer.state.editorState.getCurrentContent())})
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

  handleChange(value){

  }

  render() {

    if(this.props.user !== undefined){

    const questions = this.state.questions.map((el, i)=>{
      console.log(el.question)
      return (
        <div className="quest" key={i}>
            <p className="label">Q{i} - question</p>
            <CodeEditor readOnly={false} editing={true} content={el.title} type="text" ref={(ref)=>{this.question = ref}} onChange={(e)=>{this.editQuestion(i, e)}} />
            <p className="label">Q{i} - answer</p>
            <CodeEditor readOnly={false} editing={true} content={el.content} type="text" ref={(ref)=>{this.answer = ref}} onChange={(e)=>{this.editAnswer(i, e)}} />

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
  console.log(this.props.interview.id)

    return (
      <div className="section">

        <h2 className="pageTitle">Edit Interview</h2>

        <form onSubmit={(e)=>{this.props.submitEdits(this.props.interview.id,

          {
            interview: {
              title: this.state.title,
              position: this.state.position,
              industry: this.state.industry,
              summary: this.state.summary,
              id: this.props.interview.id

            },

            questions: this.state.questions,
            tags: this.state.tags
          }, e

        )}}>

          <input type="text" onChange={(e)=>{this.setState({title: e.target.value})}}
            placeholder="title this post" value={this.state.title} />

          <input type="text" onChange={(e)=>{this.setState({position: e.target.value})}}
            placeholder="position title" value={this.state.position}/>
          <input type="text" onChange={(e)=>{this.setState({industry: e.target.value})}}
            placeholder="industry" value={this.state.industry}/>
          <textarea type="text" onChange={(e)=>{this.setState({summary: e.target.value})}}
            placeholder="interview summary" value={this.state.summary}/>

          <h3 className="label">questions</h3>
          {questions}
          <button className="generalButton" onClick={this.addQuestion}>add new question</button>
          <div className="tagsContainer">
          <p className="label">tags</p>
          {tags}
          </div>
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    this.addTag()
                  }}>
        <input type='text' ref={(ref)=>{this.tag = ref}} placeholder="add new tag"/>
        <button className="generalButton" onClick={this.addTag}>add tag</button>
        </form>

          <button className="submitButton" type="Submit">Submit Edits</button>
        </form>





      </div>
    )}
    return(<div> you must be logged in to post!</div>)
  }
}













{/*import React from 'react'
import CodeEditor from './CodeEditor.jsx'
const axios = require('axios')


export default class InterviewEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      questions: [{title:'', content: ''}],
      tags: []
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
    this.addTag = this.addTag.bind(this)

  }

  onSubmit(id){
    axios.put(`/interview/${this.props.interview.id}`, this.state.interview)
      .then(()=>{
        //refresh page
      })
  }

  componentDidMount(){
    this.setState({
      title: this.props.interview.title,
      questions: this.props.questions,
      tags: this.props.tags
    })
  }

  onEdit(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
            question: e,
            answer: _el.answer
          }
        })
      }
    })
  }

  editAnswer(i, e){
    this.setState((prevState)=>{
      return {
        questions: prevState.questions.map((_el, _i)=>{
          if (i !== _i) return _el
          return {
            question: _el.question,
            answer: e
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
      e.preventDefault
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
          tags: prevState.tags.concat({name: this.tag.value.toLowerCase()})
        }
      })
      this.tag.value = ''
    }

  render(){

    const questionForms = this.state.questions.map((el, i)=>{
      return  (
        <div key={i} className='questionForm'>
          <div className="labeledRow">
            <p>question</p>
            <input type="text" onChange={(e)=>{this.editQuestion(i, e.target.value)}}
              value={this.state.questions[i].title}
              placeholder="question" />
            <CodeEditor readOnly={false} content={undefined} type="text" ref={(ref)=>{this.question = ref}} onChange={(e)=>{this.editQuestion(i, e)}} />

          </div>
          <div className="labeledRow">
            <p>answer</p>
            <input type="text" onChange={(e)=>{this.editAnswer(i, e.target.value)}}
              value={this.state.questions[i].content}
              placeholder="answer" />
            </div>
          <button onClick={(e)=>{this.deleteQuestion(i, e)}}>delete question</button>
        </div>
      )
    })

    const tags = this.state.tags.map((el, i)=>{
      return (<div key={i}>
        <p>{el.name}</p>
        <button onClick={(e)=>{this.deleteTag(i, e)}}>x</button>
      </div>)
    })

    return(
      <div className="section">
      <form onSubmit={this.onSubmit}>
      <p>title</p>
      <input type="text" name="title" onChange={this.onEdit} value={this.state.title} />
      {questionForms}
      <button onClick={this.addQuestion}>add new question</button>
      <h2>tags</h2>
      {tags}

      <button type="Submit">Submit Edits</button>
      </form>
      <form onSubmit={this.addTag}>
      <input type='text' ref={(ref)=>{this.tag = ref}} placeholder="tag"/>
      <button onClick={this.addTag}>add tag</button>
      </form>
      </div>
    )
  }
}*/}
