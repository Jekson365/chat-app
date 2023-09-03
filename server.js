const express = require("express")
const app = express();
const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("user disconnected!")
    })
    socket.on("message", (msg) => {
        io.emit('my message',msg)
        console.log(msg)
    })
    console.log("user connected!")
})

io.emit("my message",
    { someProperty: 'some value', otherProperty: 'other value' }
)


server.listen(8080, () => {
    console.log("server is up!")
})