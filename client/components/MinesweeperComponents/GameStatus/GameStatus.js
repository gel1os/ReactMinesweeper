import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import { gameStatuses } from 'client/utils/constants';
import { gameStatusPropType } from 'client/utils/prop-types';
import Timer from '../Timer';
import NumberBoard from 'client/components/NumberBoard';
import Emoji from './Emoji';

const GameStatus = ({
  status,
  setStatus,
  gameState,
  gameSettings,
  changeGameComplexity,
  pressed,
}) => {
  const gameStatusRef = useRef(status);

  useEffect(() => {
    gameStatusRef.current = status;
  }, [status]);

  useEffect(() => () => {
    if (gameStatusRef.current === gameStatuses.in_progress) {
      setStatus(gameStatuses.paused);
    }
  }, []);


  const onEmoji = () => {
    if (status === gameStatuses.paused) {
      setStatus(gameStatuses.in_progress);
    } else {
      changeGameComplexity(gameSettings.complexity);
    }
  };

  const onTimer = () => {
    if (status === gameStatuses.paused) {
      setStatus(gameStatuses.in_progress);
    } else if (status === gameStatuses.in_progress) {
      setStatus(gameStatuses.paused);
    }
  };

  return (
    <div className="status-wrapper">
      <NumberBoard number={gameState.flagsLeft} />
      <div className="game-result" onPointerUp={onEmoji}>
        <Emoji status={status} pressed={pressed}/>
      </div>
      <div className="time-spent" onPointerUp={onTimer}>
        <Timer />
      </div>
    </div>
  );
};

GameStatus.propTypes = {
  status: gameStatusPropType,
  setStatus: PropTypes.func.isRequired,
  gameState: PropTypes.object.isRequired,
  gameSettings: PropTypes.object.isRequired,
  changeGameComplexity: PropTypes.func.isRequired,
  pressed: PropTypes.bool.isRequired,
};

export default GameStatus;