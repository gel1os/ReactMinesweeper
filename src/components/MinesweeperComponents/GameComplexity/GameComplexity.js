import React, {Component, PropTypes} from 'react';

export default class GameComplexity extends Component {
    static propTypes = {
        changeGameComplexity: PropTypes.func.isRequired,
        startGame: PropTypes.func.isRequired,
        finishGame: PropTypes.func.isRequired,
        pauseGame: PropTypes.func.isRequired,
        gameSettings: PropTypes.shape({
            complexity: PropTypes.string.isRequired
        }).isRequired,
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired
        }).isRequired
    };

    render() {
        let {gameSettings, gameState, startGame, finishGame, pauseGame} = this.props;
        let gameInProgress = gameState.started && !gameState.finished;

        return (
            <div>
                Select Game Complexity
                {this.renderRadioButtons('game-complexity', ['beginner', 'normal', 'expert'])}

                <div className="btn btn-success start-game"
                     onClick={() => { startGame(gameSettings.complexity)}}>
                    { gameInProgress ? `Restart` : 'Start'} Game
                </div>

                { gameInProgress
                    ? (
                        <div className="game-in-progress-btns">
                            <div className="pause-game btn btn-warning" onClick={() => { pauseGame()}}>
                                { gameState.paused ? 'Resume' : 'Pause'} Game
                            </div>
                            <div className="finish-game btn btn-primary" onClick={() => { finishGame()}}>
                                Finish Game
                            </div>
                        </div>
                    )
                    : ''
                }
            </div>

        );
    };

    renderRadioButtons(name, values) {
        let {gameSettings, gameState, changeGameComplexity} = this.props;
        let gameInProgress = gameState.started && !gameState.finished;
        return values.map((value, i) => {
            return (
                <div className="radio" key={i}>
                    <label>
                        <input type="radio"
                               name={name}
                               value={value}
                               onChange={ e => { changeGameComplexity(e.target.value.toUpperCase()) } }
                               checked={gameSettings.complexity === value.toUpperCase()}
                               disabled={gameInProgress}
                        />
                        { value }
                    </label>
                </div>
            )
        });
    }
}
