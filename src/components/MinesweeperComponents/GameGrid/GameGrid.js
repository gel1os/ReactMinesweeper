import React, {Component, PropTypes} from 'react';
import {createArray} from './../../../utils/minesweeper-helpers.js';
import Row from './Row';
import Cell from './Cell';

export default class GameGrid extends Component {
    static propTypes = {
        gameSettings: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            mines: PropTypes.number.isRequired,
        }).isRequired,
        handleCellOpening: PropTypes.func.isRequired,
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired,
            paused: PropTypes.bool.isRequired,
            finished: PropTypes.bool.isRequired,
            cells: PropTypes.array.isRequired
        }).isRequired
    };

    render() {
        return (
            <div className="container game-grid">
                {this.buildGrid(this.props.gameSettings)}
            </div>
        );
    };

    buildGrid(settings) {
        let { width, height} = settings;

        let rows = createArray(height);
        let cellsPerRow = createArray(width);

        return rows.map(row => {
            let cells = cellsPerRow.map(col => {

                let cellObject = {
                    rowNumber: row,
                    columnNumber: col,
                    isClosed: false,
                    hasFlag: false,
                    hasMine: false,
                    isDummy: true
                };

                let { gameState } = this.props;

                if (gameState.cells.length) {
                    cellObject = gameState.cells[row][col];
                }

                return (
                    <Cell key={`${row}.${col}`}
                          handleCellOpening={this.props.handleCellOpening}
                          cell={cellObject}
                          cells={gameState.cells}
                    />
                );
            });

            return ( <Row key={row}>{cells}</Row> )

        });
    }
}
