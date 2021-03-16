import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleCellOpening, toggleFlag, handleClickOnOpenedCell } from 'client/actions/minesweeperActions.js'

import GameGrid from './GameGrid.js';

function mapStateToProps(state) {
  return {
    rows: state.gridState.rows,
    gameState: state.gameState,
    complexity: state.gameSettings.complexity,
    congratulationsOpened: state.congratulations.opened,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      handleCellOpening,
      toggleFlag,
      handleClickOnOpenedCell,
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);