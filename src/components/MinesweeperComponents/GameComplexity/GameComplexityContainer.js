import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, chooseGameComplexity, pauseGame } from './../../../actions/minesweeperActions.js'
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
      pauseGame,
    }, dispatch)
  }
}

const GameComplexityContainer = connect(mapStateToProps, mapDispatchToProps)(GameComplexity);

export default GameComplexityContainer;

