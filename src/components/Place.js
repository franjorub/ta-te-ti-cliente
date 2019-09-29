import React, { Component } from 'react'

export default class Place extends Component {
    render() {
        const { children, onSelect, row, column } = this.props;
        return (
            <div 
                style={{
                    width: 100, 
                    height: 100, 
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={() => onSelect(row, column)}
            >
                { children }
            </div>
        )
    }
}
