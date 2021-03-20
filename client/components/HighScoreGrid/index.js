import { connect } from 'react-redux';
import {getScore} from 'client/actions/highScoreActions';

import HighScoreGrid from './HighScoreGrid';

const mapStateToProps = ({highScore}) => ({highScore});

const mapDispatchToProps = dispatch => {
  return {
    getScore: ({complexity, sortBy, sortDirection, page}) => {
      dispatch(getScore({complexity, sortBy, sortDirection, page}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HighScoreGrid);