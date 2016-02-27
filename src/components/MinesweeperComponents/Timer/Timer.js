import React, {Component, PropTypes} from 'react';

export default class Timer extends Component {
    static propTypes = {
        timerState: PropTypes.shape({
            started: PropTypes.bool.isRequired,
            finished: PropTypes.bool.isRequired
        }).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        };
    }

    tic() {
        this.setState({seconds: this.state.seconds + 1});
    };

    startTimer() {
        let self = this;

        clearInterval(this.state.intervalId);

        let interval = setInterval(() => {
            self.tic();
        }, 1000);

        self.setState({
            seconds: 0,
            intervalId: interval
        })
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillReceiveProps(nextProps) {

        let {timerState} = nextProps;

        if (timerState.started) {
            if (timerState.finished) {
                clearInterval(this.state.intervalId);
                return;
            }
            this.startTimer();
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return <span>{this.state.seconds}</span>
    }
}