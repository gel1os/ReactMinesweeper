import LetterCounter from './LetterCounter';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeWordInput, changeLetterCounter } from '../../actions/letterCounterActions';

import { countLetters } from '../../utils/letter-counter-helpers';

function mapStateToProps(state) {
    return {
        counterResult: countLetters(state.wordInputValue, state.letterCounter) || 0,
        wordInputValue: state.wordInputValue,
        letterCounter: state.letterCounter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            changeWordInput,
            changeLetterCounter
        }, dispatch)
    }
}

const LetterCounterContainer = connect(mapStateToProps, mapDispatchToProps)(LetterCounter);

export default LetterCounterContainer;