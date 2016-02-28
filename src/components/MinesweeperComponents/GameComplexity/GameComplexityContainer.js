import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, startGame, finishGame, pauseGame } from './../../../actions/minesweeperActions'
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
            startGame,
            finishGame,
            pauseGame
        }, dispatch)
    }
}

const GameComplexityContainer = connect(mapStateToProps, mapDispatchToProps)(GameComplexity);

export default GameComplexityContainer;

