import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 1200,
    timer: null
  }

  formatTime = (timeInSec) => {
    const minutes = Math.floor(timeInSec / 60);
    const seconds = timeInSec % 60;
    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  }

  step = () => {};

  startTimer = () => {

  this.setState({
    status: 'work',
    timer: setInterval(this.step, 1000),
  });

  };
  step = () => {
    if(this.state.time == 0 && this.state.status == 'work') {
      this.setState({status: 'rest', time: 20})
      this.playBell();

    }

    if (this.state.time == 0 && this.state.status == 'rest') {
      this.setState({status: 'work', time: 1200})
      this.playBell();

    }

    this.setState({time: this.state.time - 1})

  }

  stopTimer = () => {
    clearInterval(this.state.timer)
    this.setState({status: 'off', time: 0})
  }

  closeApp = () => {
    window.close()
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {

    const { status } = this.state;


    const appDescription = <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
    return (
      <div>
        
        <h1>Protect your eyes</h1>
        {(status === 'off') && appDescription}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
