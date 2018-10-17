'use-strict'

const fs = require('fs')

const serverOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'secrety-secret-passphrase'
}

// Set up the Koa instance
const Koa = require('koa')

// Configure KoaJS
const logger = require('koa-logger')
const serve = require('koa-static')

// instantiate the app
const app = new Koa()

// Pick a port to run the instance
const thePort = process.env.PORT || 3000

// Set up the socket.io server
const httpsServer = require('https').createServer(serverOptions, app.callback())
//const httpServer = require('http').createServer(app.callback())
const io = require('socket.io')(httpsServer)
//const io = require('socket.io')(httpServer)


io.on('connection', socket => {
  console.log('client connected with id ' + socket.id)
  socket.emit('chat message', 'Welcome to this humble example')
  socket.emit('info', 'Socket connected with id ' + socket.id)
  
  socket.on('chat message', data => {
    console.log('client sent data to message endpoint', data)
    socket.emit('chat message', data)
  })
})

app.use(serve('./ui'))

console.log('Server listening at port ' + thePort)
httpsServer.listen(thePort)
//httpServer.listen(thePort)
