import React, { Component, PropTypes } from 'react';
import Todo from '../Todo/Todo'

class TodoList extends Component {

    static propTypes = {
        onTodoClick: PropTypes.func.isRequired,
        onArchiveClick: PropTypes.func.isRequired,
        todos: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired
        }).isRequired).isRequired
    };

    render() {
        return (
            <ul>
                {this.props.todos.map((todo, index) =>
                    <Todo {...todo}
                        key={index}
                        onClick={() => this.props.onTodoClick(index)}
                        onArchiveClick={(e) => {
                            e.stopPropagation();
                            this.props.onArchiveClick(index);
                        }}
                    />
                )}
            </ul>
        )
    }
}

export default TodoList;