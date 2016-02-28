import React, {Component, PropTypes} from 'react';

export default class Timer extends Component {
    static propTypes = {
        timerState: PropTypes.shape({
            started: PropTypes.bool.isRequired,
            finished: PropTypes.bool.isRequired,
            paused: PropTypes.bool.isRequired,
            seconds: PropTypes.number.isRequired,
            timerId: PropTypes.number
        }).isRequired,
        tic: PropTypes.func.isRequired,
        pauseGame: PropTypes.func.isRequired,
        setTimerId: PropTypes.func.isRequired
    };

    startTimer(timerState = this.props.timerState) {
        let { tic, setTimerId } = this.props;

        this.stopTimer();

        if (timerState.paused) {
            return;
        }

        let interval = setInterval(() => {
            tic();
        }, 1000);

        setTimerId(interval);
    }

    stopTimer(timerId = this.props.timerState.timerId) {
        clearInterval(timerId);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillReceiveProps(nextProps) {
        let timerState = this.props.timerState;
        let newTimerState = nextProps.timerState;

        if (newTimerState.paused || newTimerState.finished) {
            this.stopTimer();
        } else if (timerState.paused) {
            this.startTimer(newTimerState);
        } else if (!newTimerState.timerId) {
            this.startTimer(newTimerState);
        }
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        let {timerState} = this.props;
        return <span>{timerState.seconds}</span>
    }
}