import React, {Component, PropTypes} from 'react';
import {createArray} from './../../../utils/minesweeper-helpers.js';
import Row from './Row';
import Cell from './Cell';

export default class GameGrid extends Component {
    static propTypes = {
        gameSettings: PropTypes.object.isRequired,
        gameState: PropTypes.object.isRequired
    };

    render() {
        return (
            <div>
                {this.buildGrid(this.props.gameSettings)}
            </div>
        );
    };

    buildGrid(settings) {
        let { width, height, mines } = settings;

        let rows = createArray(height);
        let cellsPerRow = createArray(width);

        return rows.map(row => {
            let cells = cellsPerRow.map(cell => {
                return (
                    <Cell key={`${row}.${cell}`}
                          cell={cell}
                          row={row}
                    />
                );
            });
            return ( <Row key={row}>{cells}</Row> )
        });
    }
}
