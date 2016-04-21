import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCellOpening, toggleFlagSetting, handleClickOnOpenedCell, winGame } from './../../../actions/minesweeperActions';

import GameGrid from './GameGrid.js';

function mapStateToProps(state) {
    return {
        gameSettings: state.gameSettings,
        gameState: state.gameState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            handleCellOpening,
            handleClickOnOpenedCell,
            toggleFlagSetting,
            winGame
        }, dispatch)
    }
}

const GameGridContainer = connect(mapStateToProps, mapDispatchToProps)(GameGrid);

export default GameGridContainer;