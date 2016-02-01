import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setVisibilityFilter, toggleTodo, addTodo, archiveTodo } from '../../../actions/todoListActions';

import { filterTodos } from '../../../utils/todo-helpers';

import TodoListWrapper from './TodoListWrapper';

function mapStateToProps(state) {
    return {
        visibleTodos: filterTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            setVisibilityFilter,
            toggleTodo,
            addTodo,
            archiveTodo
        }, dispatch)
    }
}

const TodoListWrapperContainer = connect(mapStateToProps, mapDispatchToProps)(TodoListWrapper);

export default TodoListWrapperContainer;