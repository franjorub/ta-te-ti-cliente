const path = require('path');
const bradcastListener = require('./server/broadcast');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const socketIo = require('socket.io');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'client/build/static')));
app.use(helmet.noSniff());
app.use(cors());

app.get('/find-server', (req, res) => {
    bradcastListener(res);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', socket => {
    bradcastListener.on('message', function (message, rinfo) {
        console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
        socket.emit('server-ip', rinfo.address)
    });
});

server.listen(4002, () => {
    console.log('listening at http://localhost:' + 4002);
});