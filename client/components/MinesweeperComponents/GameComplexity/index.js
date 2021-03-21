import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeGameComplexity } from 'client/actions/minesweeperActions.js';
import GameComplexity from './GameComplexity.js';

const mapStateToProps = (state) => {
  return {
    gameSettings: state.gameSettings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      changeGameComplexity,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameComplexity);