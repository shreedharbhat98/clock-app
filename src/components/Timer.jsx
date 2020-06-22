import React, { Component } from 'react';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sec: "",
            min: "",
            hour: "",
            value: "START",
            timerOver: false,
            mSec: 0,
            startSec: 0,
            startMin: 0,
            startHour: 0
        }
    }
    takeHour = (e) => {
        this.setState({
            hour: e.target.value,
        })
    }
    takeMinutes = (e) => {
        this.setState({
            min: e.target.value,
        })
    }
    takeSeconds = (e) => {
        this.setState({
            sec: e.target.value,
        })
    }

    takeTime = () => {
        var { sec, min, hour } = this.state
        var time = ((hour * 3600000) + (min * 60000) + (sec * 1000))
        return time
    }
    startTimer = () => {
        if(this.state.value === "START"){
            let time = this.takeTime()
            if(time === 0){
                alert("Enter Valid Time")
                return;
            }
            this.setState({ mSec: (time-1000), sec:"", min:"", hour:"", timerOver:false }, () => {});

        }
        if (this.state.value === "START" || this.state.value === "RESUME") {
            this.setState({
                value: "PAUSE"

            }, clearInterval(this.interval))
            this.interval = setInterval(() => {
                if (this.state.sec === 0) {
                    this.setState({
                        timerOver: true,
                        value: "START"
                    })
                }
                else {
                    const { mSec } = this.state
                    let sec, min, hour;
                    if(mSec === 0){
                        this.setState({ timerOver:true, value: "START" }, this.reset=() => {
                            clearInterval(this.interval)
                        });
                    }
                    this.setState({ mSec: (this.state.mSec - 1000) }, () => {});
                    sec = Math.floor((mSec / 1000) % 60)
                    min = Math.floor((mSec / (60 * 1000)) % 60)
                    hour = Math.floor((mSec / (60 * 60 * 1000)) % 24)
                    this.setState({
                        startSec: sec,
                        startMin: min,
                        startour: hour
                    })
                }
            }, 1000)
        }
        else if (this.state.value === "PAUSE") {
            this.setState({
                value: "RESUME"
            })
            clearInterval(this.interval)
        }
    }

    stopTimer = () => {
        this.setState({
            sec: "",
            min: "",
            hour: "",
            startSec:0,
            startMin:0,
            startour:0,
            timerOver: false,
            value: "START"
        })
        clearInterval(this.interval)
    }

    render() {
        const {isActive} = this.props
        const style={display: isActive === "timer" ? "block" : "none"}

            return (
                <div style={style}>
                    <div className="Content" id="timerUI">
                        <div style={{ display: "flex", paddingTop: "5%", textAlign: "center" }}>
                            <input style={{ width: "200px", margin: 13, textAlign: "center", borderStyle: "none", backgroundColor: "transparent" }} type="number" value={(this.state.hour)} onChange={this.takeHour} onKeyUp={this.takeHour} placeholder="Hours" />
                            <input style={{ width: "200px", margin: 13, textAlign: "center", borderStyle: "none", backgroundColor: "transparent" }} type="number" value={this.state.min} onChange={this.takeMinutes} onKeyUp={this.takeMinutes} placeholder="Minutes" />
                            <input style={{ width: "200px", margin: 13, textAlign: "center", borderStyle: "none", backgroundColor: "transparent" }} type="number" value={this.state.sec} onChange={this.takeSeconds} onKeyUp={this.takeSeconds} placeholder="Seconds" />
                        </div>
                        <div>
                        {this.state.timerOver === false ? <div style={{ fontSize: 60, paddingTop: 15 }}>{this.state.startHour < 10 ? " 0" + this.state.startHour : this.state.startHour} <span>h</span> :
                        {this.state.startMin < 10 ? " 0" + this.state.startMin : this.state.startMin} <span>m</span> :
                        {this.state.startSec < 10 ? " 0" + this.state.startSec : this.state.startSec} <span>s</span></div> : <h2>Timer Over</h2>}
                        </div>
                    </div>

                    <div className=" p-1" id="border-top">
                        <button className="m-2 font-weight-bold btn px-5 btn btn-outline-primary" id="start" onClick={this.startTimer}>{this.state.value}</button>
                        <button className="m-2 font-weight-bold btn px-5 btn-outline-dark" onClick={this.stopTimer}>Reset</button>
                    </div>
                    </div>
            )
    }
}