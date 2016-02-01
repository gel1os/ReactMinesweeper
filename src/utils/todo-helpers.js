import { VisibilityFilters } from '../actions/todoListActions';

export const filterTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos.filter(todo => !todo.archived);

        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed && !todo.archived);

        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed && !todo.archived);

        case VisibilityFilters.SHOW_ARCHIVED:
            return todos.filter(todo => todo.archived);
    }
};