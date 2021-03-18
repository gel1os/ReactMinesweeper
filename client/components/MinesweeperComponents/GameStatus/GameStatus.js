import React, {useEffect, useRef} from 'react';

import Timer from '../Timer';
import NumberBoard from './NumberBoard';
import Emoji from './Emoji';

const GameStatus = ({
  gameInProgress,
  gameState,
  gameSettings,
  pauseGame,
  resumeGame,
  changeGameComplexity,
  pressed,
}) => {
  const gameInProgressRef = useRef(gameInProgress)

  useEffect(() => {
    gameInProgressRef.current = gameInProgress;
  }, [gameInProgress]);

  useEffect(() => () => gameInProgressRef.current && pauseGame(), [])

  const onEmoji = () =>
    gameState.paused ?
      resumeGame() :
      changeGameComplexity(gameSettings.complexity)

  const onTimer = () => gameState.paused ? resumeGame() : pauseGame()

  return (
    <div className="status-wrapper">
      <NumberBoard number={gameState.flagsLeft} />
      <div className="game-result" onPointerUp={onEmoji}>
        <Emoji gameState={gameState} pressed={pressed}/>
      </div>
      <div className="time-spent" onPointerUp={onTimer}>
        <Timer />
      </div>
    </div>
  )
}

export default GameStatus;