import React, { Component } from 'react'

export default class Chip extends Component {
    

    handleSelect = () => {
        const { onSelect, row, column } = this.props;
        onSelect(row, column)
    }

    render() {
        const { row, column, isSelected, type } = this.props;
        const color = type === 'O' ? 'green' : 'red';
        return (
            <div 
                style={{                    
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={this.handleSelect}
            >
                <p style={{ color: isSelected ? 'blue' : color, fontSize: '20px' }}>{`${type}`}</p>
            </div>
            
        )
    }
}
