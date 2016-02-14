import React, {Component, PropTypes} from 'react';

export default class GameComplexity extends Component {
    static propTypes = {
        changeGameComplexity: PropTypes.func.isRequired,
        startGame: PropTypes.func.isRequired,
        gameSettings: PropTypes.shape({
            complexity: PropTypes.string.isRequired
        }).isRequired,
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired
        }).isRequired
    };

    render() {
        let gameStarted = this.props.gameState.started;

        return (
            <div>
                Select Game Complexity
                {this.renderRadioButtons('game-complexity', ['beginner', 'normal', 'expert'])}

                <div className="btn btn-success start-game"
                     onClick={() => { this.props.startGame(this.props.gameSettings.complexity)}}>
                    { gameStarted ? `Restart` : 'Start'} Game
                </div>

                { gameStarted
                    ? (
                        <div className="finish-game btn btn-primary" onClick={() => { this.props.finishGame()}}>
                            Finish Game
                        </div>
                    )
                    : ''
                }
            </div>

        );
    };

    renderRadioButtons(name, values) {
        return values.map((value, i) => {
            return (
                <div className="radio" key={i}>
                    <label>
                        <input type="radio"
                               name={name}
                               value={value}
                               onChange={ e => { this.props.changeGameComplexity(e.target.value.toUpperCase()) } }
                               checked={this.props.gameSettings.complexity === value.toUpperCase()}
                               disabled={this.props.gameState.started}
                        />
                        { value }
                    </label>
                </div>
            )
        });
    }
}
