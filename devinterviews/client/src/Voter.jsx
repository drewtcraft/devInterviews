import React from 'react';


export default class Voter extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      score: this.props.score,
      selected: 'none'
    }
  }

  componentDidMount(){
    this.setState({
      score: this.props.score,
      selected: this.props.voteStatus
    })
  }



  render(){

    let upValue = 1
    let downValue = -1


  let up = (
    <button


      >👍</button>)


  let down = (
    <button
   >👎</button>)


  switch (this.state.selected){
    case 'up':
    downValue = -1
    upValue = 0
    up = (
      <button
        className="hightlightedButton"
        onClick={
          (e)=>{

            let newScore = this.state.score - 1

            this.setState({
              selected:'none',
              score: newScore
            })

            this.props.handleVote(
            {
              type: this.props.type,
              type_id: this.props.id,
              amount: 0
            }, e)


          }
        }>👍</button>)

    down = (
      <button
        onClick={
          (e)=>{

            this.setState({
              selected:'down',
              score: this.state.score - 2
            })

            this.props.handleVote(
            {
              type: this.props.type,
              type_id: this.props.id,
              amount: downValue
            }, e)


          }
        }>👎</button>)

      break;
    case 'down':
    upValue = 1
    downValue = 0
    up = (
      <button
        onClick={
          (e)=>{

            this.setState({
              selected:'up',
              score: this.state.score + 2
            })

            this.props.handleVote(
            {
              type: this.props.type,
              type_id: this.props.id,
              amount: upValue
            }, e)


          }
        }>👍</button>)

    down = (
      <button
        className="hightlightedButton"
        onClick={
          (e)=>{

            this.setState({
              selected:'none',
              score: this.state.score + 1
            })

            this.props.handleVote(
            {
              type: this.props.type,
              type_id: this.props.id,
              amount: downValue
            }, e)


          }
        }>👎</button>)
      break;

    case 'none':
      upValue = 1
      downValue = -1
      up = (
        <button
          onClick={
            (e)=>{

              this.setState({
                selected:'up',
                score: this.state.score + 1
              })

              this.props.handleVote(
              {
                type: this.props.type,
                type_id: this.props.id,
                amount: upValue
              }, e)


            }
          }>👍</button>)

      down = (
        <button
          onClick={
            (e)=>{

              this.setState({
                selected:'down',
                score: this.state.score - 1
              })

              this.props.handleVote(
              {
                type: this.props.type,
                type_id: this.props.id,
                amount: downValue
              }, e)


            }
          }>👎</button>)
          break;
    default:
      break;
  }

  return (
    <div className="voteContainer">
    {up}
    <h3>{this.state.score}</h3>
    {down}
    </div>
  )
}
}
