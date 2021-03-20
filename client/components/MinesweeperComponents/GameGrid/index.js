import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStatus, toggleFlag, openCell, startGame } from 'client/actions/minesweeperActions.js';

import GameGrid from './GameGrid.js';

const mapStateToProps = (state) => {
  return {
    rows: state.gridState.rows,
    gameState: state.gameState,
    status: state.gameState.status,
    complexity: state.gameSettings.complexity,
    congratulationsOpened: state.congratulations.opened,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      openCell,
      setStatus,
      startGame,
      toggleFlag,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);