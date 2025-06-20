import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    initialtime: 25,
    starttime: true,
    timerStart: true,

    seconds: 0, // 60//
  }

  componentWillUnmount() {
    this.clear()
  }

  clear = () => {
    clearInterval(this.timerId)
  }

  secondsupdate = () => {
    const {initialtime, seconds} = this.state

    let sec = 0
    sec += seconds - 1 // seconds
    if (sec === 0) {
      this.setState({initialtime: initialtime - 1, seconds: 59})
    } else if (sec < 0) {
      this.setState({seconds: 59})
    } else if (sec < 10) {
      this.setState({seconds: `0${sec}`})
    } else {
      this.setState({seconds: sec})
    }
  }

  ondecreaseinMinutes = () => {
    this.timerId = setInterval(() => {
      this.secondsupdate()
    }, 1000)
  }

  incrementfunc = () => {
    const {initialtime, timerStart} = this.state
    let time = 0
    if (timerStart === false) {
      console.log('notimer set')
      time += initialtime
    } else {
      time += initialtime + 1

      this.setState({initialtime: time, seconds: 59})
    }
  }

  decrementfunc = () => {
    const {initialtime, timerStart} = this.state

    let time = 0
    if (timerStart === false) {
      time += initialtime
    } else {
      time += initialtime - 1

      this.setState({initialtime: time})
    }
  }

  resettime = () => {
    clearInterval(this.timerId)

    this.setState({
      initialtime: 25,
      seconds: 0,
      timerStart: true,
    }) // '00'
  }

  changeIcon = () => {
    const {seconds} = this.state

    this.ondecreaseinMinutes()
    this.setState({
      starttime: false,
      seconds,
      timerStart: false,
    })
  }

  onclickpause = () => {
    const {seconds} = this.state
    this.setState({starttime: true, seconds})
    this.clear()
  }

  formatTime = (minutes, seconds) => {
    const paddedMinutes = String(minutes).padStart(2, '0')
    const paddedSeconds = String(seconds).padStart(2, '0')
    return `${paddedMinutes}:${paddedSeconds}`
  }

  render() {
    const {initialtime, starttime, seconds} = this.state

    const displayTime = this.formatTime(initialtime, seconds)

    /* const c = initialdefaulttimer
      ? `${initialtime}:00`
      : displayTime            //`${initialtime}:${seconds}`//
      */
    const text = starttime ? 'Paused' : 'Running'

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
                {starttime ? (
                  <>
                    <button
                      className="button-section"
                      type="button"
                      onClick={this.changeIcon}
                    >
                      <div className="row-arr">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                          className="start-imge"
                          alt="play icon"
                        />
                        <p className="par-start">start</p>
                      </div>
                    </button>
                  </>
                ) : (
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
                    type="button"
                    className="minu-color"
                    onClick={this.decrementfunc}
                  >
                    -
                  </button>
                  <button type="button" className="num-size">
                    <p>{initialtime}</p>
                  </button>
                  <button
                    type="button"
                    className="minu-color"
                    onClick={this.incrementfunc}
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
