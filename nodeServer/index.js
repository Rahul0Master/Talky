// Node server which will handle our socket io connections

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket=>{

    //When New User Join the chat
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //When a User send Message
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //When a User left the chat
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})