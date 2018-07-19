import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Minesweeper from './../MinesweeperComponents/Minesweeper';
import { hot } from 'react-hot-loader'
class App extends Component {
    render() {
        return (
            <div>
                <Route component={Minesweeper}/>
                <a href="https://github.com/gel1os/ReactMinesweeper" target="_blank"
                   className="view-github btn btn-default">
                    <i className="fa fa-github"></i> View on GitHub
                </a>
            </div>
        )
    }
}
export default hot(module)(App);