import React, { Component, PropTypes } from 'react';

class Todo extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        onArchiveClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    };

    render() {
        return (
            <li onClick={this.props.onClick} className="todo-item">
                <span className={ this.props.completed ? 'completed' : ''} >
                { this.props.text }
                </span>
                {' '}
                <span onClick={this.props.onArchiveClick}
                      className="archive-todo"
                >
                Archive todo
                </span>
            </li>
        )
    }
}

export default Todo;