import React, { Component, PropTypes } from 'react';

import Tabs from '../Tabs';

export default class App extends Component {
    render() {
        return (
            <div>
                <Tabs />
                {this.props.children}
            </div>
        )
    }
}
