import React, { Component } from 'react'

export default class Row extends Component {
    render() {
        const { children } = this.props;
        return (
            <div style={{ display:'flex', justifyContent: 'space-between'}}>
                {children}
            </div>
        )
    }
}
