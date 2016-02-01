import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getGameSettings } from './../../../utils/minesweeper-helpers.js'

import GameGrid from './GameGrid.js';

function mapStateToProps(state) {
    return {
        gameSettings: state.gameSettings,
        gameState: state.gameState
    }
}

const GameGridContainer = connect(mapStateToProps)(GameGrid);

export default GameGridContainer;
