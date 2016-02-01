import React, { Component } from 'react';

import { Link } from 'react-router';

export default class Tabs extends Component {
    render() {
        return (
            <div>
                <div className="tabs">
                    <Link to="/">Todo list</Link>
                    {' '}
                    <Link to="/letter-counter">Letter Counter</Link>
                    {' '}
                    <Link to="/minesweeper">Minesweeper</Link>
                </div>
            </div>
        )
    }
}