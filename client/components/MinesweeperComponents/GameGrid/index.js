import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStatus, toggleFlag, handleCellOpening, handleClickOnOpenedCell, startGame } from 'client/actions/minesweeperActions.js';

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
      handleCellOpening,
      setStatus,
      startGame,
      toggleFlag,
      handleClickOnOpenedCell,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);