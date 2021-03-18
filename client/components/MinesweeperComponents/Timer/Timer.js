import React, {useEffect} from 'react';
import NumberBoard from '../GameStatus/NumberBoard'

const Timer = ({tick, gameInProgress, paused, seconds}) => {
  useEffect(() => {
    let interval = null;
    if (gameInProgress && !paused) {
      interval = setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [gameInProgress, paused, tick]);

  return <NumberBoard number={seconds} />
}

export default Timer;