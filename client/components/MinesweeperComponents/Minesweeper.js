import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';
import Dialog from '../Dialog/Dialog';

class Minesweeper extends Component {
  render() {
    return (
      <div className="game">
        <GameComplexity />
        <GameGrid />
        {this.props.opened && <Dialog />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { opened } = state.dialog;
  return { opened };
}

export default connect(mapStateToProps)(Minesweeper)