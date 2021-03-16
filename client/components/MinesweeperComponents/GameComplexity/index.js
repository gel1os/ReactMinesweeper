import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity } from 'client/actions/minesweeperActions.js'
import GameComplexity from './GameComplexity.js';

function mapStateToProps(state) {
  return {
    gameSettings: state.gameSettings,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      changeGameComplexity,
    }, dispatch)
  }
}

const GameComplexityContainer = connect(mapStateToProps, mapDispatchToProps)(GameComplexity);

export default GameComplexityContainer;