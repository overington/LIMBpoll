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
        console.log('--- New Question: ', msg)
        // send to audience
        socket.broadcast.emit('update-input', msg)
        // write to json
        // ...
        callback({status: 'ok'})
      })


      // Audience member submits an answer
      socket.on('audience-submit-answer', (question, vote) => {
        console.log('AUDIENCE - ', question, ': with vote: ', vote)
        socket.broadcast.emit('dashboard-answer', question, vote)
      })
    })
  }
  res.end()
}

export default SocketHandler
