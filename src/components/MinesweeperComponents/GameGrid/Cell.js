import React, {Component, PropTypes} from 'react';

export default class extends Component {
    static propTypes = {
        cell: PropTypes.shape({
            rowNumber: PropTypes.number.isRequired,
            columnNumber: PropTypes.number.isRequired,
            isClosed: PropTypes.bool.isRequired,
            hasFlag: PropTypes.bool.isRequired,
            hasMine: PropTypes.bool.isRequired
        }),
        gameState: PropTypes.shape({
            started: PropTypes.bool.isRequired,
            paused: PropTypes.bool.isRequired,
            finished: PropTypes.bool.isRequired,
            cells: PropTypes.array.isRequired
        }).isRequired,
        handleCellOpening: PropTypes.func.isRequired
    };

    render() {
        let { cell } = this.props;

        let cellClass = this.getCellClass(cell);

        return (
            <div className={`cell ${cellClass}`}
                 data-col={cell.columnNumber}
                 data-row={cell.rowNumber}
                 onClick={this.handleClick.bind(this)}
                 onContextMenu={this.handleContextMenu.bind(this)}>
                {cell.minesNearby && !cell.isClosed ?
                    <span className={`mines-number m${cell.minesNearby}`}>{cell.minesNearby}</span>
                    : ''}
            </div>
        )
    }

    handleClick() {
        let { cell, gameState, handleCellOpening } = this.props;
        let cells = gameState.cells;

        if (cell.isClosed && gameState.started && !cell.hasFlag) {
            handleCellOpening(cell, cells);
        }
    }

    handleContextMenu(e) {
        let {cell, toggleFlagSetting} = this.props;
        e.preventDefault();

        if (cell.isClosed) {
            toggleFlagSetting(cell);
        }

    }

    getCellClass(cell) {
        let {gameState} = this.props;

        if (cell.hasMine && gameState.finished) {
            return 'fa fa-bomb';
        }

        if (cell.hasFlag) {
            return 'fa fa-flag';
        }

        if (cell.isClosed) {
            return '';
        } else {
            if (cell.minesNearby) {
                return `opened mines${cell.minesNearby}`
            }
            return 'opened';
        }
    }
}