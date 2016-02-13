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
        openCell: PropTypes.func.isRequired
    };

    render() {
        let { cell, openCell } = this.props;

        let cellClass = this.getCellClass(cell);

        return (
            <div className={`cell ${cellClass}`}
                 data-col={cell.columnNumber}
                 data-row={cell.rowNumber}
                 onClick={() => { openCell(cell) }}
                 onContextMenu={this.handleContextMenu.bind(this)}>
            </div>
        )
    }

    handleContextMenu(e) {
        e.preventDefault();
        console.log('right click on', this.props.cell, this.props.row);
    }

    getCellClass(cell) {

        if (cell.isDummy) {
            return 'dummy-cell';
        }

        if (cell.hasMine) {
            return 'red';
        }

        if (cell.isClosed) {
            return ''
        } else {
            return 'green';
        }
    }
}