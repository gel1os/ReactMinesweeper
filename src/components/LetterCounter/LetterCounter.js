import React, { Component, PropTypes } from 'react';

class LetterCounter extends Component {
    static propTypes = {
        changeWordInput: PropTypes.func.isRequired,
        counterResult: PropTypes.number.isRequired,
        changeLetterCounter: PropTypes.func.isRequired,
        wordInputValue: PropTypes.string,
        letterCounter: PropTypes.string
    };

    render() {
        return (
            <div className="letter-counter">
                <div>Count the number of vowel or consonant letters:</div>
                <input type="text"
                       defaultValue={this.props.wordInputValue}
                       placeholder="Type word here"
                       onChange={(e) => this.props.changeWordInput(e.target.value)}/>
                <div>
                    {this.renderRadioButtons('letter-counter', ['vowel', 'consonant'])}
                </div>
                <div>Result</div>
                {this.props.counterResult}
            </div>
        );
    }

    renderRadioButtons(name, values) {
        return values.map((value, i) => {
            return (
                <label key={i}>
                    <input type="radio"
                           name={name}
                           value={value}
                           onChange={() => { this.props.changeLetterCounter(value.toUpperCase()); }}
                           checked={ this.props.letterCounter === value.toUpperCase() }
                        />
                    {`Count ${value}s`}
                </label>
            )
        });
    }
}

export default LetterCounter;