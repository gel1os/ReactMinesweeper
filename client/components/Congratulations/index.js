import { connect } from 'react-redux';
import { hideCongratulations, getProductivity } from 'client/actions/congratulationsActions';
import Congratulations from './Congratulations';

const mapStateToProps = (state) => {
  const {complexity} = state.gameSettings;
  const {seconds} = state.gameState;
  const {productivity} = state.congratulations;
  return { complexity, time: seconds, productivity };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideCongratulations: () => {
      dispatch(hideCongratulations());
    },
    getProductivity: ({time, complexity}) => {
      dispatch(getProductivity({time, complexity}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Congratulations);