import React, { Component, PropTypes } from 'react';

class todoVisibilityFilters extends Component {

    static propTypes = {
        onFilterChange: PropTypes.func.isRequired,
        filter: PropTypes.oneOf([
            'SHOW_ALL',
            'SHOW_COMPLETED',
            'SHOW_ACTIVE',
            'SHOW_ARCHIVED'
        ]).isRequired
    };

    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name;
        }
        return (
            <a href="#" onClick={ e => {
                    e.preventDefault();
                    this.props.onFilterChange(filter)
                }}>
                {name}
            </a>
        )
    };

    render() {
        return (
            <p>
                Show:
                {' '}
                {this.renderFilter('SHOW_ALL', 'ALL')}
                {', '}
                {this.renderFilter('SHOW_COMPLETED', 'Completed')}
                {', '}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}
                {', '}
                {this.renderFilter('SHOW_ARCHIVED', 'Archived')}
                .
            </p>
        )
    }
}

export default todoVisibilityFilters;