import React, {useEffect, useRef} from 'react';

import Timer from '../Timer';
import NumberBoard from './NumberBoard';
import Emoji from './Emoji';

const GameStatus = ({
  gameState,
  gameSettings,
  dispatchPauseGame,
  dispatchResumeGame,
  changeGameComplexity,
  pressed,
}) => {
  const gameInProgress = useRef(false)

  useEffect(() => {
    gameInProgress.current = gameState.minesSet && !gameState.finished;
  }, [gameState.finished, gameState.minesSet]);

  useEffect(() => () => {
    pause();
  }, []);

  const pause = () => {
    if (gameInProgress.current) {
      dispatchPauseGame();
    } 
  }

  const togglePause = () => {
    if (!gameState.paused) {
      pause();
    } else {
      dispatchResumeGame();
    }
  }

  const restart = () => {
    if (gameState.paused) {
      dispatchResumeGame();
      return;
    }

    if (gameState.minesSet) {
      changeGameComplexity(gameSettings.complexity);
    }
  }

  return (
    <div className="status-wrapper">
      <NumberBoard number={gameState.flagsLeft} />
      <div className="game-result" onPointerUp={restart}>
        <Emoji gameState={gameState} pressed={pressed}/>
      </div>
      <div className="time-spent" onPointerUp={togglePause}>
        <Timer />
      </div>
    </div>
  )
}

export default GameStatus;