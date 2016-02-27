import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Timer from './Timer.js';

function mapStateToProps(state) {
    return {
        timerState: state.timerState
    }
}

const TimerContainer = connect(mapStateToProps)(Timer);

export default TimerContainer;

