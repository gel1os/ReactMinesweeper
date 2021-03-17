import React, { Component } from 'react';
import NumberBoard from '../GameStatus/NumberBoard'
export default class Timer extends Component {
  startTimer() {
    const { tick } = this.props;
    this.interval = setInterval(tick, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  componentWillReceiveProps(nextProps) {
    const {gameState} = this.props;
    const {gameState: newGameState} = nextProps;

    if (!gameState.minesSet && newGameState.minesSet) {
      this.startTimer();
      return;
    } else if (!newGameState.minesSet) {
      this.stopTimer();
      return;
    }

    if (newGameState.paused || newGameState.finished) {
      this.stopTimer();
    } else if (gameState.paused) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return <NumberBoard number={this.props.timerState.seconds} />
  }
}