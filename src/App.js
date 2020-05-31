import React from 'react';
import './App.css';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      stopwatch:true,
      timer:false,
      isActive:"stopwatch",
      msec: 0,
      sec: 0,
      min: 0,
      isTimerOn: false,
      value: "START",
    }
  }

  updateTimer = ()=>{
    this.setState({
      isActive:"timer",
    })
  }
  updateStopwatch =()=>{
    this.setState({
      isActive : "stopwatch"
    })
  }

  render() {
    return (
      <div className="App">
        <div className="TimerBox">
          <div className="Grid">
           <h3 className="font-weight-bold pb-4" onClick={this.updateStopwatch} style={{borderBottom: this.state.isActive === "stopwatch" ? "3px solid blue" :""}}>Stopwatch</h3>
           <h3 className="font-weight-bold pb-4" onClick={this.updateTimer} style={{borderBottom: this.state.isActive === "timer" ? "3px solid blue" :""}}>Timer</h3>
          </div>
            <Stopwatch isActive={this.state.isActive} />
            <Timer isActive={this.state.isActive}/>
        </div>
      </div>
    )
  }

}

export default App;
