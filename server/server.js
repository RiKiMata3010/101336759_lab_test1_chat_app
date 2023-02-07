
// const mongoose = require('mongoose');
// const Msg = require('./models/postSchema');

const io = require ('socket.io')(3000, {
    cors:{
        origin: ['http://localhost:8080']
    }
})
// const mongoDb = 'mongodb+srv://phoenixarmand-ani:1234567ani@cluster0.mrvq3t5.mongodb.net/message-app?retryWrites=true&w=majority';
// mongoose.connect(mongoDb).then(()=>{
//     console.log('Connected to Database')
// }).catch(err => console.log(err))
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