const express = require ("express")
const server = express()
const logger = require("morgan")
const path = require('path')
const dotenv = require("dotenv")
dotenv.config()
const http = require('http')
const {Server}= require('socket.io')
const cors = require("cors")
const bodyParser = require("body-parser")
const adminRoute = require("./Routes/adminRoute")
const userRoute= require("./Routes/userRoute")
const expertRoute= require("./Routes/expertRoute")
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const connectDb = require("./Controller/config/dbConfig")
const httpServer = http.createServer(server)

const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  })
server.use('/', express.static(path.join(__dirname, 'Public')))
server.use(bodyParser.json({limit:"1200kb"}))
connectDb(DATABASE_URL)
server.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','POST'],
    credentials:true
}))

server.use(logger("dev"))
server.use(express.urlencoded({extended:false}))
server.use(express.json())

//Routes
server.use("/",userRoute)
server.use("/admin",adminRoute)
server.use("/expert",expertRoute)
//Chat Socket
  global.onlineUsers= new Map()
  io.on("connection",(socket)=>{
    global.chatSocket =socket

    socket.on("add-user",(userId)=>{
      console.log(userId);
      onlineUsers.set(userId,socket.id)
    })

    socket.on('send-message',(data)=>{
      const sendUserSocket= onlineUsers.get(data.to)
      if(sendUserSocket){
        socket.to(sendUserSocket).emit('msg-recieve',data.msg)
      }
    })
  })
//Server Listening
 httpServer.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
})  

module.exports = server