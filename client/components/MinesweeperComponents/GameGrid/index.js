import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFlag, openCell, startGame } from 'client/actions/minesweeperActions.js';

import GameGrid from './GameGrid.js';

const mapStateToProps = (state) => {
  return {
    cells: state.gameState.cells,
    status: state.gameState.status,
    congratulationsOpened: state.congratulations.opened,
    gameSettings: state.gameSettings
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      openCell,
      startGame,
      toggleFlag,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);