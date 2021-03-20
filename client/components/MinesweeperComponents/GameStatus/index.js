
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity, setStatus } from 'client/actions/minesweeperActions.js';
import GameStatus from './GameStatus.js';

function mapStateToProps({gameState, gameSettings}) {
  return {
    gameState,
    gameSettings,
    status: gameState.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      changeGameComplexity,
      setStatus,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);