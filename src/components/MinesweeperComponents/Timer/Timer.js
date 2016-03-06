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
    componentWillReceiveProps(nextProps) {
        let timerState = this.props.timerState;
        let newTimerState = nextProps.timerState;


        if (!timerState.started && newTimerState.started) {
            this.startTimer(newTimerState);
        } else if (timerState.started && newTimerState.seconds === 0) {
            this.stopTimer();
        }

        if (newTimerState.paused || newTimerState.finished) {
            this.stopTimer();
        } else if (timerState.paused) {
            this.startTimer(newTimerState);
        }
    }

    componentDidMount() {
        let {timerState} = this.props;

        if (timerState.started && !timerState.paused) {
            this.startTimer();
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