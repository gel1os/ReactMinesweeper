import React, {Component, PropTypes} from 'react';

export default class extends Component {
    static propTypes = {
        cell: PropTypes.number.isRequired,
        row: PropTypes.number.isRequired
    };

    render() {
        let { cell, row } = this.props;

        return (
            <div className={`cell cell${cell} row${row}`}
                onClick={this.handleClick.bind(this)}
                onContextMenu={this.handleContextMenu.bind(this)}>
            </div>
        )
    }

    handleClick(e) {
        console.log('left click on', this.props.cell, this.props.row);
    }

    handleContextMenu(e) {
        e.preventDefault();
        console.log('right click on', this.props.cell, this.props.row);
    }
}