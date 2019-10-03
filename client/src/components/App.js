import React from 'react';
import SocketIoClient from 'socket.io-client';
import uuid from 'react-uuid';
import Board from './Board';
import Place from './Place';
import Row from './Row';
import Chip from './Chip';


class App extends React.Component {
  state = {
    board: [],
    player: {
      id: null,
      number: null
    },
    loading: true,
    chip: null,
    ready: false
  }

  constructor(props) {
    super(props);
    this.socket = null;
  }

  componentDidMount() {    
    this.socket = SocketIoClient(window.location.href);
    this.socket.on('server-ip', ip => {
      this.socket.close();
      this.socket = SocketIoClient(`http://${ip}:4001`);
      this.socket.emit('log', { name: 'Francisco' });
      this.socket.on('log', ( response ) => {
        if(response.type === 'OK') {
          this.setState({
            player: {
              number: response.number,
              id: response.id
            },
            board: response.board,
            chip: response.chip,
            loading: false
          });

          this.socket.on('boardUpdate', board => {
            this.setState({ board, });
          });
        }else {
          alert('You can\'t join to this match, is FULL');
        }
      })
      this.socket.on('hello', message => console.log(message));
      this.socket.on('ready', ready => {
        this.setState({
          ready
        })
      })
    })
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

  setAllowedSpace = (board, newRow, newColumn) => {
    // if(!(newRow > 2 || newRow < 0 || newColumn > 2 || newColumn < 0)){
    //   if (board[newRow][newColumn] === '') {
    //     board[newRow][newColumn] = '.';
    //   }
    // }
  }

  handleSelectChip = (row, column) => {
    
    // this.setState(state => {
    //   const board = [...state.board];

    //   this.setAllowedSpace(board,row + 1,column);
    //   this.setAllowedSpace(board,row - 1,column);
    //   this.setAllowedSpace(board,row,column + 1);
    //   this.setAllowedSpace(board,row,column - 1);
    //   this.setAllowedSpace(board,row + 1,column + 1);
    //   this.setAllowedSpace(board,row + 1,column - 1);
    //   this.setAllowedSpace(board,row - 1,column + 1);
    //   this.setAllowedSpace(board,row - 1,column - 1);

      
    //   console.log(board, row, column)
    //   return {
    //     currentChip: {
    //       row,
    //       column,
    //       isSelect: true
    //     },
    //     board
    //   }
    // })
  }

  handleSelectPlace = (row, column) => {
    const {ready} = this.state;

    if(ready) {

      this.setState((state) => {
        const board = [...state.board];
        const chip = state.chip;
  
        if(board[row][column] === '') {
          board[row][column] = chip;
          
          this.socket.emit('move', board);
        }
  
        return ({ 
          board,
        });
      })
    }

  }

  renderPlace = (place, i, j) => {
    if(place === 'X' || place === 'O') {
      return (
        <Chip 
          row={i} 
          column={j} 
          onSelect={this.handleSelectChip} 
          isSelected={false}
          type={place}
        />
      )
    }
    if (place === '') return '';
  }

  renderBoard = () => {
    const { board, player, ready } = this.state;
    const canPlay = player.number < 3;

    return (
    <div style={{ height: '100vh' }}>
      {
        canPlay 
        ? <h1>Player: { player.number } </h1>
        : <p>You are in guest mode</p>
      }
      
      <Board>
        {
          board.map((row, i) => (
            <Row key={uuid()}>
              {
                row.map((place, j) => (
                  <Place
                    row={i}
                    column={j}
                    onSelect={ canPlay ? this.handleSelectPlace: () => {}}
                    key={uuid()}
                  >
                    {
                      this.renderPlace(place, i, j)
                    }
                  </Place>
                ))
              }
            </Row>
          ))
        }
      </Board>      
      {
        ready
        ? <p>Start!</p>
        : <p>Waiting for 2nd player....</p>
      }
    </div>
  );
}
  

  render() {
    const { loading } = this.state;
    return (
      <div>
        {
          loading
          ? (
              <div>
                <p>findign server</p>
              </div>
            ) 
          : this.renderBoard()
           
        }
      </div>
    );
  }
}

export default App;
