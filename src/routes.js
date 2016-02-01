import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import TodoListWrapper from './components/TodoListComponents/TodoListWrapper';
import LetterCounter from './components/LetterCounter';
import Minesweeper from './components/MinesweeperComponents/Minesweeper';

export default class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={TodoListWrapper}/>
                    <Route path="letter-counter" component={LetterCounter}/>
                    <Route path="minesweeper" component={Minesweeper}/>
                </Route>
            </Router>
        );
    }
}

