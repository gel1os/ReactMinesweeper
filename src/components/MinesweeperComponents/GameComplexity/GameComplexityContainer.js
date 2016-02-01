import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity } from './../../../actions/minesweeperActions'
import GameComplexity from './GameComplexity.js';

function mapStateToProps(state) {
    return {
        gameSettings: state.gameSettings
    }
}


function mapDispatchToProps(dispatch) {
    return {
            ...bindActionCreators({
            changeGameComplexity
        }, dispatch)
    }
}

const GameComplexityContainer = connect(mapStateToProps, mapDispatchToProps)(GameComplexity);

export default GameComplexityContainer;

