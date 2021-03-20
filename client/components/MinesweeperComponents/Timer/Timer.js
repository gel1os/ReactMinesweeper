import { gameStatuses } from 'client/utils/constants';
import React, {useEffect} from 'react';
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

export default Timer;