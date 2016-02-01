import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {addTodo} from './../../../actions/todoListActions';

class AddTodo extends Component {
    render() {
        return (
            <div className="add-todo">
                <input type="text" ref="input"/>
                <button onClick={e => this.handleClick(e) }>
                    Add
                </button>
            </div>
        )
    }

    handleClick(e) {
        const node = this.refs.input;
        const text = node.value.trim();
        this.props.onAddClick(text);

        node.value = '';
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
};

export default AddTodo;