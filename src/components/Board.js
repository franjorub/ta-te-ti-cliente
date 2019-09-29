import React, { Component } from 'react'

export default class Board extends Component {
    render() {
        const { children } = this.props;
        return (
            <div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
                <div style={{ 
                    height: 400, 
                    border: '1px solid black',
                    width: 600, 
                    display:'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'
                }}>
                    {children}
                </div>      
            </div>
        )
    }
}
