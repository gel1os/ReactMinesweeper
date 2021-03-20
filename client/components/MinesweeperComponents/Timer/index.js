import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { tick } from 'client/actions/minesweeperActions';
import Timer from './Timer.js';

const mapStateToProps = ({timerState, gameState}) => {
  return {
    seconds: timerState.seconds,
    status: gameState.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      tick,
    }, dispatch)
  };
};

const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;