import React, {Component} from 'react';

export default class extends Component {
    render() {
        return (
            <div className='row'>
                {this.props.children}
            </div>
        )
    }
}