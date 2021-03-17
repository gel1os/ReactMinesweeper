
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, pauseGame, resumeGame } from 'client/actions/minesweeperActions.js';
import GameStatus from './GameStatus.js';

function mapStateToProps(state) {
  return {
    gameState: state.gameState,
    gameSettings: state.gameSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      changeGameComplexity,
      dispatchPauseGame: pauseGame,
      dispatchResumeGame: resumeGame,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus)