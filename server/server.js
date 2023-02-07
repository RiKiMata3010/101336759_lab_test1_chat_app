const io = require ('socket.io')(3000, {
    cors:{
        origin: ['http://localhost:8080']
    }
})

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message, room) => {
        if (room === ""){
           socket.broadcast.emit('receive-message', `${socket.id} : ${message}`)
        }else {
           socket.to(room).emit('receive-message', `${socket.id} : ${message}`)
        }
    })
    socket.on('join-room', (room, status) => {
        socket.join(room)
        status(`${socket.id} has joined room : ${room}`)
    })
})