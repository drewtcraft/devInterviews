import React from 'react';

export default class InterviewForm extends React.Component {

  constructor(props){
    super(props)
    this.state={
      questions: [{question: '', answer: ''}]
    }

    this.addQuestion = this.addQuestion.bind(this)
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

  render() {

    const questions = this.state.questions.map((el, i)=>{
      return (
        <div key={i}>
          <p>question</p>
          <input type="text" onChange={(e)=>{this.editQuestion(i, e.target.value)}}
            value={this.state.questions[i].question}
            placeholder="question" />
          <p>answer</p>
          <input type="text" onChange={(e)=>{this.editAnswer(i, e.target.value)}}
            value={this.state.questions[i].answer}
            placeholder="answer" />
          <button onClick={(e)=>{this.deleteQuestion(i, e)}}>delete question</button>
        </div>
      )
    })

    return (
      <div className="interviewForm">
        <h2>Interview Survey</h2>
        <form >
          <h3>Basic Information</h3>
          <input type="text" ref={(ref)=>{this.positionTitle = ref}}
            placeholder="position title"/>
          <h3>Questions</h3>
          <p>questions you were asked in the interview</p>
          {questions}
          <button onClick={this.addQuestion}>add new question</button>
        </form>



      </div>
    )
  }
}
