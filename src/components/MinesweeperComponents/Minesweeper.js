import React, {Component, PropTypes} from 'react';
import GameComplexity from './GameComplexity/';
import GameGrid from './GameGrid/';

export default class extends Component {
    render() {
        return (
            <div>
                Minesweeper
                <GameComplexity/>
                <GameGrid/>
            </div>
        );
    }
}