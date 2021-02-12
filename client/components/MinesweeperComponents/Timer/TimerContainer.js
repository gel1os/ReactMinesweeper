import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tick } from 'client/actions/minesweeperActions'
import Timer from './Timer.js';

function mapStateToProps(state) {
  return {
    timerState: state.timerState,
    gameState: state.gameState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      tick,
    }, dispatch)
  }
}

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;

