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
      const hostPlayer = data.users
      const gamePin = data.gamePin
      const newGame = await new gamesModel(data).save()
      console.log("host player ID:", hostPlayer)
      if (newGame) {
        try {
          const addHostToGame = await gamesModel.findOneAndUpdate({gamePin: gamePin},
            {
              $push: {
              players: {
                player: hostPlayer
              }
            }
          }, { new: true })
          console.log("current game:", addHostToGame)
        } catch (error) {
          console.log(error)
        }
      }
      else { throw new Error("could not add the host to the game")}
    } catch (error) {
      console.log(error)
    }
    //sends the user and game details back to host details 
    socket.emit('display game', data)
  })

  // when a player join an existing game
  socket.on('joining a game', async (data) => {
    socket.join("game-room")
    try {
      const newPlayer = data.users
      const gamePin = data.gamePin
      const addPlayerToGame = await gamesModel.findOneAndUpdate({gamePin: gamePin},
        {
          $push: {
            players: {
              player: newPlayer
            }
          }
        }, { new: true })
      console.log("joining game:" , addPlayerToGame)
    } catch (error) {
      console.log(error)
    }
     socket.emit('display game', data)
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