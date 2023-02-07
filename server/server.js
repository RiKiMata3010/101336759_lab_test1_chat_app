
const mongoose = require('mongoose');
const io = require ('socket.io')(3000 , {
    cors:{
        origin: ['http://localhost:8080']
    }
})
const Msg = require('./models/postSchema.js');

const mongoDb = 'mongodb+srv://phoenixarmand-ani:superidol123@cluster0.mrvq3t5.mongodb.net/message-app?retryWrites=true&w=majority';
mongoose.connect(mongoDb, {useNewUrlParser : true, useUnifiedTopology : true}).then(()=>{
    console.log('Connected to Database')
}).catch(err => console.log(err))


io.on('connection', socket => {
    console.log(socket.id)
    socket.on('send-message', (message, room) => {
        const mail = new Msg({message});
        mail.save().then(()=>{
            if (room === ""){
                socket.broadcast.emit('receive-message', `${socket.id} : ${message}`)
             }else {
                socket.to(room).emit('receive-message', `${socket.id} : ${message}`)
             }
        })
    })
    socket.on('join-room', (room, status) => {
        socket.join(room)
        status(`${socket.id} has joined room : ${room}`)
    })
})