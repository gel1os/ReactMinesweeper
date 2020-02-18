import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tick, pauseGame, setTimerId } from './../../../actions/minesweeperActions'
import Timer from './Timer.js';

function mapStateToProps(state) {
  return {
    timerState: state.timerState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      tick,
      pauseGame,
      setTimerId
    }, dispatch)
  }
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;

