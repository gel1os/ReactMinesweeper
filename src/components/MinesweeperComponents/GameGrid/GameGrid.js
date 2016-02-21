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
            flags: PropTypes.number.isRequired
        }).isRequired,
        handleCellOpening: PropTypes.func.isRequired,
        toggleFlagSetting: PropTypes.func.isRequired,
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired,
            paused: PropTypes.bool.isRequired,
            win: PropTypes.bool.isRequired,
            finished: PropTypes.bool.isRequired,
            cells: PropTypes.array.isRequired
        }).isRequired
    };

    render() {
        let {gameState, gameSettings} = this.props;
        return (
            <div className="game-grid-wrapper">
                <div>
                    {gameState.started && gameState.win ? <span>You win</span> : ''}
                    <div>
                        <span className="time-spent">
                            <i className="fa fa-clock-o"></i> 0
                        </span>
                    <span className="flags-left pull-right">
                        <i className="fa fa-flag"></i> {gameState.started ? gameState.flagsLeft : 0}
                    </span>
                    </div>
                </div>
                <div className="game-grid">
                    {this.buildGrid(gameSettings)}
                </div>
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
                    hasMine: false
                };

                let { gameState } = this.props;

                if (gameState.cells.length) {
                    cellObject = gameState.cells[row][col];
                }

                return (
                    <Cell key={`${row}.${col}`}
                          handleCellOpening={this.props.handleCellOpening}
                          toggleFlagSetting={this.props.toggleFlagSetting}
                          cell={cellObject}
                          gameState={this.props.gameState}
                    />
                );
            });

            return ( <Row key={row}>{cells}</Row> )

        });
    }

}
