const path = require('path')
const express = require('express')
const app = express()

const SocketIO = require('socket.io')
const { Socket } = require('dgram')

app.use((express.static(path.join(__dirname,"Public"))))



app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () =>{
    console.log("server port:", app.get("port"));
})


const io = SocketIO(server)

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"Public/index.html"))
})

io.on('connection', (socket)=>{
  socket.on("message", (data)=>{
    socket.broadcast.emit("message", data)
  })
})