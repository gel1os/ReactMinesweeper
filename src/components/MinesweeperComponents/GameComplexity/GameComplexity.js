import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class GameComplexity extends Component {
    static propTypes = {
        changeGameComplexity: PropTypes.func.isRequired,
        chooseGameComplexity: PropTypes.func.isRequired,
        gameSettings: PropTypes.shape({
            complexity: PropTypes.string.isRequired
        }).isRequired,
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired
        }).isRequired
    };

    render() {
        let {gameSettings, gameState, changeGameComplexity, chooseGameComplexity, pauseGame} = this.props;
        let gameInProgress = gameState.started && !gameState.finished;

        return (
            <div>
                <h4>Select Game Complexity</h4>
                {this.renderRadioButtons('game-complexity', ['Beginner', 'Normal', 'Expert'])}

                <div className="btn btn-success start-game"
                     onClick={() => { chooseGameComplexity(gameSettings.complexity)}}>
                    { gameInProgress ? 'Restart' : 'Start'} Game
                </div>

                { gameInProgress
                    ? (
                    <div className="game-in-progress-btns">
                        <div className="pause-game btn btn-warning"
                             onClick={() => { pauseGame()}}>
                            { gameState.paused ? 'Resume' : 'Pause'} Game
                        </div>
                        <div className="finish-game btn btn-primary"
                             onClick={() => { changeGameComplexity(gameSettings.complexity)}}>
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
