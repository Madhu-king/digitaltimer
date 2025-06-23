import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    initialtime: 25,
    /* starttime: true,
    timerStart: true, */
    timerRunning: false,

    seconds: 0, // 60//
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  secondsupdate = () => {
    this.setState(prevState => {
      const {initialtime, seconds} = prevState
      if (initialtime === 0 && seconds === 0) {
        clearInterval(this.timerId)
        return {initialtime: 0, seconds: 0, timerRunning: false}
      }
      if (seconds === 0) {
        return {initialtime: initialtime - 1, seconds: 59}
      }
      return {seconds: seconds - 1}
    })
  }

  /* ondecreaseinMinutes = () => {
    this.timerId = setInterval(() => {
      this.secondsupdate()
    }, 1000)
  } */

  incrementfunc = () => {
    const {timerRunning, initialtime} = this.state
    if (!timerRunning) {
      this.setState(prevState => ({initialtime: prevState.initialtime + 1}))
    }
  }

  decrementfunc = () => {
    const {timerRunning, initialtime} = this.state
    if (!timerRunning && initialtime > 1) {
      this.setState(prevState => ({initialtime: prevState.initialtime - 1}))
    }
  }

  resettime = () => {
    clearInterval(this.timerId)

    this.setState({
      initialtime: 25,
      seconds: 0,
      timerRunning: false,
    }) // '00'
  }

  starttimer = () => {
    this.timerId = setInterval(this.secondsupdate, 1000)
    this.setState({
      timerRunning: true,
    })
  }

  onclickpause = () => {
    clearInterval(this.timerId)
    this.setState({timerRunning: false})
  }

  formatTime = (minutes, seconds) => {
    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')
    return `${paddedMinutes}:${paddedSeconds}`
  }

  render() {
    const {initialtime, timerRunning, seconds} = this.state

    const displayTime = this.formatTime(initialtime, seconds)

    /* const c = initialdefaulttimer
      ? `${initialtime}:00`
      : displayTime            //`${initialtime}:${seconds}`//
      */
    const text = timerRunning ? 'Running' : 'Paused'

    return (
      <div className="outer-cont">
        <div className="bg-color">
          <h1 className="heading">Digital Timer</h1>
          <div className="arrange">
            <div className="bg">
              <div className="timer-display">
                <h1 className="time">{displayTime}</h1>
                <p className="textdis">{text}</p>
              </div>
            </div>
            <div className="set">
              <div>
                {timerRunning ? (
                  <>
                    <button
                      className="button-section"
                      type="button"
                      onClick={this.onclickpause}
                    >
                      <div className="row-arr">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                          className="start-imge"
                          alt="pause icon"
                        />
                        <p className="par-start">Pause</p>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="button-section"
                      type="button"
                      onClick={this.starttimer}
                    >
                      <div className="row-arr">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                          className="start-imge"
                          alt="play icon"
                        />
                        <p className="par-start">Start</p>
                      </div>
                    </button>
                  </>
                )}
                <button
                  className="button-section"
                  type="button"
                  onClick={this.resettime}
                >
                  <div className="row-arr">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                      className="start-imge"
                      alt="reset icon"
                    />
                    <p className="par-start">Reset</p>
                  </div>
                </button>
              </div>

              <div className="settimelimit-sec">
                <p className="head">Set Timer Limit</p>

                <div className="btn-section">
                  <button
                    onClick={this.decrementfunc}
                    disabled={timerRunning}
                    type="button"
                    className="minu-color"
                  >
                    -
                  </button>

                  <button type="button" className="num-size">
                    <p>{initialtime}</p>
                  </button>

                  <button
                    onClick={this.incrementfunc}
                    disabled={timerRunning}
                    type="button"
                    className="minu-color"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
