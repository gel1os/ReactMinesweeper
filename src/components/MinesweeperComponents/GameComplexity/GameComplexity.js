import React, {Component, PropTypes} from 'react';

export default class GameComplexity extends Component {
    static propTypes = {
        changeGameComplexity: PropTypes.func.isRequired,
        gameSettings: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                Select Game Complexity2222
                {this.renderRadioButtons('game-complexity', ['beginner', 'normal', 'expert'])}
            </div>
        );
    };

    renderRadioButtons(name, values) {
        return values.map((value, i) => {
            return (
                <div key={i}>
                    <label>
                        <input type="radio"
                               name={name}
                               value={value}
                               onChange={ e => { this.props.changeGameComplexity(e.target.value.toUpperCase()) } }
                               checked={this.props.gameSettings.complexity === value.toUpperCase()}
                            />
                        { value }
                    </label>
                </div>
            )
        });
    }
}
