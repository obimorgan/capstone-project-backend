import { createServer } from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import server from './server'
import game from './services/game'
import gamesModel from './services/game/schema'


process.env.TS_NODE_DEV && require("dotenv").config()
const { MONGO_CONNECTION, PORT } = process.env

const httpServer = createServer(server)
const io = new Server(httpServer, {})

io.on('connection', socket => { 
  console.log("socketId", socket.id)

  // when a host connects --> when client clicks on "create a new game"
  socket.on('create a game', async (data)=> {
    console.log("here", data)
    socket.join("game-room")
    console.log("Socket room", socket.rooms)
    try {
      const newGame = await new gamesModel(data).save()
      console.log(newGame)
    } catch (error) {
      console.log(error)
    }
    // sockt.to()
  })

  socket.on('join a game', async ({joiningGamepin, users}) => {
    socket.join("game-room")
    try {
      
      const currentGame = await gamesModel.findByIdAndUpdate
    } catch (error) {
      console.log(error)
    }
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