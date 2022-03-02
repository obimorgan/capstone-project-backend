import { createServer } from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import server from './server'
import userModel from './services/users'


process.env.TS_NODE_DEV && require("dotenv").config()
const { MONGO_CONNECTION, PORT } = process.env

const httpServer = createServer(server)
const io = new Server(httpServer, {})

io.on('connection', socket => { 
  console.log("socketId", socket.id)

  // when a host connects 
  socket.on('host-join', ({game}) => {
    socket.join("game-room") 
    console.log("here", game)
  })


  socket.on('disconnect', () => { console.log('disconnected')})

})

mongoose.connect(MONGO_CONNECTION!);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
  httpServer.listen(PORT, () => {
    console.log("Server listens to port:", PORT);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});