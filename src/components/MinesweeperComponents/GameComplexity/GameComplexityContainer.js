import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, startGame, chooseGameComplexity, finishGame, pauseGame } from './../../../actions/minesweeperActions'
import GameComplexity from './GameComplexity.js';

function mapStateToProps(state) {
    return {
        gameSettings: state.gameSettings,
        gameState: state.gameState
    }
}


function mapDispatchToProps(dispatch) {
    return {
            ...bindActionCreators({
            changeGameComplexity,
            chooseGameComplexity,
            pauseGame
        }, dispatch)
    }
}

const GameComplexityContainer = connect(mapStateToProps, mapDispatchToProps)(GameComplexity);

export default GameComplexityContainer;

