import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log('New user has connected')

      // Admin changes to question
      socket.on('update-question-admin', (msg, callback) => {
        console.log('Admin has submitted update in question to: ', msg)
        // send to audience
        socket.broadcast.emit('update-input', msg)
        // write to json
        // ...
        callback({status: 'ok'})
      })


      // Audience member submits an answer
      socket.on('submit-answer', answer => {
        socket.broadcast.emit('dashboard-answer', dashboardAnswer)
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
