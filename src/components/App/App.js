import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <a href="https://github.com/gel1os/ReactMinesweeper" target="_blank"
                   className="view-github btn btn-default">
                    <i className="fa fa-github"></i> View on GitHub
                </a>
            </div>
        )
    }
}
