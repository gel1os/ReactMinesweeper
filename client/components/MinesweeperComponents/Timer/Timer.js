import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import { gameStatuses } from 'client/utils/constants';
import { gameStatusPropType } from 'client/utils/prop-types';
import NumberBoard from '../GameStatus/NumberBoard';

const Timer = ({tick, status, seconds}) => {
  useEffect(() => {
    let interval = null;
    if (status === gameStatuses.in_progress) {
      interval = setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tick]);

  return <NumberBoard number={seconds} />;
};

Timer.propTypes = {
  status: gameStatusPropType,
  tick: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default Timer;