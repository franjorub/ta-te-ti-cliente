import React from 'react';
import SocketIoClient from 'socket.io-client';
import uuid from 'react-uuid';
import Board from './Board';
import Place from './Place';
import Row from './Row';
import Chip from './Chip';

const BOARD = [
  ['', 'O', ''],
  ['', '', 'O'],
  ['', 'O', ''],  
]

class App extends React.Component {
  state = {
    currentChip: {
      row: null,
      column: null,
      isSelect: false
    },
    board: [],
    player: {
      id: null,
      name: null
    }
  }

  constructor(props) {
    super(props);
    this.socket = null;
  }

  async componentDidMount() {
    this.setState({board: BOARD})
    this.socket = SocketIoClient('http://127.0.0.1:4001');
    this.socket.emit('log', { name: 'Francisco' });
    this.socket.on('log', ( response ) => {
      if(response.type === 'OK') {
        this.setState({
          player: {
            name: 'Francisco',
            id: response.id
          }
        });

        this.socket.on('boardUpdate', board => {
          this.setState({ board, });
        });
      }else {
        alert('You can\'t join to this match, is FULL');
      }
    })
    this.socket.on('hello', message => console.log(message));
  }
  
  componentDidUpdate() {
    const { board } = this.state;

    //first case horizontal rows
    if((board[0][0] === board[0][1] && board[0][1] === board[0][2]) && board[0][0] !== '') {
      alert('Win!');
    }

    if((board[1][0] === board[1][1] && board[1][1] === board[1][2]) && board[1][0] !== '') {
      alert('Win!');
    }

    if((board[2][0] === board[2][1] && board[2][1] === board[2][2]) && board[2][0] !== '') {
      alert('Win!');
    }

    //second case vertical rows

    if((board[0][0] === board[1][0] && board[1][0] === board[2][0]) && board[0][0] !== '') {
      alert('Win!');
    }

    if((board[0][1] === board[1][1] && board[1][1] === board[2][1]) && board[0][1] !== '') {
      alert('Win!');
    }

    if((board[0][2] === board[1][2] && board[1][2] === board[2][2]) && board[0][2] !== '') {
      alert('Win!');
    }

    //thrid case diagonals
    if((board[0][0] === board[1][1] && board[1][1] === board[2][2]) && board[0][0] !== '') {
      alert('Win!');
    }

    if((board[0][2] === board[1][1] && board[1][1] === board[2][0]) && board[0][2] !== '') {
      alert('Win!');
    }

    

    
  }

  handleSelectChip = (row, column) => this.setState({
    currentChip: {
      row,
      column,
      isSelect: true
    }
  })

  handleSelectPlace = (row, column) => {

    this.setState((state) => {
      const board = [...state.board];
      const currentChip = {...state.currentChip};

      if(board[row][column] === '' && currentChip.isSelect) {
        board[row][column] = 'O';
        board[currentChip.row][currentChip.column] = '';
        currentChip.row = null;
        currentChip.column = null;
        currentChip.isSelect = false;
        this.socket.emit('move', board);
      }

      return ({ 
        board,
        currentChip
      });
    })

  }


  

  render() {
    const { board, currentChip, player } = this.state;
    return (
      <div style={{ height: '100vh' }}>

      <h1>Player: { player.id } </h1>
      <Board>
        {
          board.map((row, i) => (
            <Row key={uuid()}>
              {
                row.map((place, j) => (
                  <Place
                    row={i}
                    column={j}
                    onSelect={this.handleSelectPlace}
                    key={uuid()}
                  >
                    {
                      place === 'O'
                        ? <Chip 
                            row={i} 
                            column={j} 
                            onSelect={this.handleSelectChip} 
                            isSelected={currentChip.column === j && currentChip.row === i}
                          />
                        : ''
                    }
                  </Place>
                ))
              }
            </Row>
          ))
        }
      </Board>      
      </div>
    );
  }
}

export default App;
