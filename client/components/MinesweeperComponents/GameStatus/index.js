
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, pauseGame, resumeGame } from 'client/actions/minesweeperActions.js';
import GameStatus from './GameStatus.js';

function mapStateToProps({gameState, gameSettings}) {
  return {
    gameState,
    gameSettings,
    gameInProgress: gameState.minesSet && !gameState.finished,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      changeGameComplexity,
      pauseGame,
      resumeGame,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus)