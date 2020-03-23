var express = require('express');
var app = express();



//adding socket.io
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//made server an object for socket.io because it needs a var to bind to
const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});


// attaching socket to server
io.attach(server);


//socket = your connection to server*
// socketName.io ... make multiple rooms

io.on('connection', function(socket){
    console.log('a user has connected.');
    socket.emit('connected', {sID: socket.id, message: 'new connection' });

    socket.on('chat_message', function(msg){
        console.log(msg);

        io.emit('new_message', {id: socket.id, message: msg})
    })

    socket.on('playerJoined', function(player){
        console.log(player + 'has joined the chat');
        io.emit('newPlayer', player);
    })


    socket.on('disconnect', function(socket){
        console.log('a user has disconnected');
    });
});