import React, { Component, PropTypes } from 'react';

import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../VisibleTodoList/VisibleTodoList';
import TodoVisibilityFilters from '../TodoVisibilityFilters/TodoVisibilityFilters';

export default class ToDoListWrapper extends Component {
    static propTypes = {
        setVisibilityFilter: PropTypes.func.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        addTodo: PropTypes.func.isRequired,
        archiveTodo: PropTypes.func.isRequired,
        visibleTodos: PropTypes.array.isRequired,
        visibilityFilter: PropTypes.string.isRequired
    };

    render() {
        const { visibleTodos, visibilityFilter } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={text => this.props.addTodo(text)}
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index => this.props.toggleTodo(index)}
                    onArchiveClick={index => this.props.archiveTodo(index)}
                />
                <TodoVisibilityFilters
                    filter={visibilityFilter}
                    onFilterChange={filter => this.props.setVisibilityFilter(filter)}
                />
            </div>
        );
    }
}