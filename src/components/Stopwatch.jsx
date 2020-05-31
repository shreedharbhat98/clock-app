import React, { Component } from 'react';

export default class Stopwatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msec: 0,
      sec: 0,
      min: 0,
      isTimerOn: false,
      value: "START",
    }
    if(this.props.isActive === true){
      this.setState({
        isTimerOn : true
      })
    }
  }

  handleStart = () => {
    if (!this.state.isTimerOn) {
      this.interval = setInterval(() => {
        this.setState({
          msec: this.state.msec + 1,
          value: "PAUSE"

        })
        if (this.state.msec === 100) {
          this.setState({
            sec: this.state.sec + 1,
            msec: 0
          })
        }
        if (this.state.sec === 60) {
          this.setState({
            min: this.state.min + 1,
            sec: 0
          })
        }
      }, 10)
      this.setState({
        isTimerOn: true,
      })
    }
    else {
      clearInterval(this.interval)
      this.setState({
        isTimerOn: false,
        value: "RESUME"
      })
    }
  }

  stopTimer = () => {
    clearInterval(this.interval)
    this.setState({
      msec: 0,
      sec: 0,
      min: 0,
      isTimerOn: false,
      value: "START"
    })
  }


  render() {
    const {isActive} = this.props
    const style={display: isActive === "stopwatch" ? "block" : "none"}
    return (
       <div style={style}>
         <div className="Content" id="timerUI">
           <div style={{ fontSize: 60, paddingTop: 70 }}>{this.state.min < 10? "0"+this.state.min :this.state.min }
           <span>m</span> : {this.state.sec < 10? "0"+this.state.sec :this.state.sec} <span>s</span> :
           {this.state.msec < 10? "0"+this.state.msec :this.state.msec} <span>ms</span></div>
         </div>
         <div className="p-1" id="border-top">
           <button className="m-2 font-weight-bold btn px-5 btn btn-outline-primary" id="start" onClick={this.handleStart}>{this.state.value}</button>
           <button className="m-2 font-weight-bold btn px-5 btn-outline-dark" onClick={this.stopTimer}>Reset</button>
         </div>
       </div>
     )

  }
}
