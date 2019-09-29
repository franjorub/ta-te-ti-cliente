import React, { Component } from 'react'

export default class Chip extends Component {
    

    handleSelect = () => {
        const { onSelect, row, column } = this.props;
        onSelect(row, column)
    }

    render() {
        const { row, column, isSelected } = this.props;
        return (
            <div 
                style={{
                    width: '50%',
                    height: '50%',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'blue' : 'green',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={this.handleSelect}
            >
                <p style={{ color: 'white' }}>{`${row},${column}`}</p>
            </div>
            
        )
    }
}
