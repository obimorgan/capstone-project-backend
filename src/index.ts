import { createServer } from 'http'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import server from './server'
import gamesModel from './services/game/schema'


process.env.TS_NODE_DEV && require("dotenv").config()
const { MONGO_CONNECTION, PORT } = process.env

const httpServer = createServer(server)
const io = new Server(httpServer, {})

io.on('connection', socket => { 
  // console.log("socketId", socket.id)
  // socket.join("game-room")

  // when a host connects --> when client clicks on "create a new game"
  socket.on('create a game', async (data) => {
    console.log("here", data)
    socket.join("game-room")
    console.log("Socket room", socket.rooms)
    try {
      const name = data.name
      const userId = data.userId
      const gamePin = data.gamePin
      const newGame = await new gamesModel(data).save()//ceate a game
      console.log("host player ID:", userId)
      if (newGame) {
        try {
          const addHostToGame = await gamesModel.findOneAndUpdate({ gamePin: gamePin },
            {
              $push: {
                players: {
                  playerId: userId,
                  name: data.name,
                  avatar: data.avatar,
                  playing: true,
                  totalScore: 0
                },
                hole1: {
                  playerId: userId,
                  name: name,
                  score: 0,
                },
                hole2: {
                  playerId: userId,
                  name: name,
                  score: 0,
                },
                hole3: {
                  playerId: userId,
                  name: name,
                  score: 0,
                },
                hole4: {
                  playerId: userId,
                  name: name,
                  score: 0,
                }
              }
            }, { new: true })
          // ---emit--- //
          socket.emit('display game', addHostToGame)
        } catch (error) {
          console.log(error)
        }
      }
      else { throw new Error("could not add the host to the game") }
    } catch (error) {
      console.log(error)
    }
  });

  // when a player join an existing game
  socket.on('joining a game', async (data) => {
    // socket.join("game-room")
    try {
      const name = data.name
      const userId = data.userId
      const gamePin = data.gamePin
      const addPlayerToGame = await gamesModel.findOneAndUpdate({gamePin: gamePin},
        {
          $push: {
            players: {
              playerId: userId,
              name: data.name,
              avatar: data.avatar,
              playing: true,
              totalScore: 0
            },
            hole1: {
              playerId: userId,
              name: name,
              score: 0,
            },
            hole2: {
              playerId: userId,
              name: name,
              score: 0,
            },
            hole3: {
              playerId: userId,
              name: name,
              score: 0,
            },
            hole4: {
              playerId: userId,
              name: name,
              score: 0,
            },
          }
        }, { new: true })
      // ---emit--- //
      socket.emit('joining player', addPlayerToGame)
      socket.broadcast.emit('new player joined')
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