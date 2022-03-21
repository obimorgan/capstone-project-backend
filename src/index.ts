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
                  playing: true
                },
                hole1: {
                  playerId: userId,
                  name: name,
                  score: 0,
                  totalScore: 0
                },
                hole2: {
                  playerId: userId,
                  name: name,
                  score: 0,
                  totalScore: 0
                },
                hole3: {
                  playerId: userId,
                  name: name,
                  score: 0,
                  totalScore: 0
                },
                hole4: {
                  playerId: userId,
                  name: name,
                  score: 0,
                  totalScore: 0
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
              playing: true
            },
            hole1: {
              playerId: userId,
              name: name,
              score: 0,
              totalScore: 0
            },
            hole2: {
              playerId: userId,
              name: name,
              score: 0,
              totalScore: 0
            },
            hole3: {
              playerId: userId,
              name: name,
              score: 0,
              totalScore: 0
            },
            hole4: {
              playerId: userId,
              name: name,
              score: 0,
              totalScore: 0
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


  socket.on('hole1', async (data) => {
    try {
      const gameId = data[0].gameId;
      const currentGame = await gamesModel.findByIdAndUpdate(
        { _id: gameId },
        {
          $push: {
            hole1: {
              $each: [
                { score: data[1].player1.score, name: data[1].player1.name, id: data[1].player1.id },
                { score: data[2].player2.score, name: data[2].player2.name, id: data[2].player2.id },
                { score: data[3].player3.score, name: data[3].player3.name, id: data[3].player3.id },
                { score: data[4].player4.score, name: data[4].player4.name, id: data[4].player4.id }
              ],
            }
          }
        }
      )
      socket.emit('hole1', (currentGame))
    } catch (error) {
      console.log(error)
    }
  });

  socket.on('hole2', async (data) => {
    try {
        const gameId = data[0].gameId;
        console.log(gameId);
        const currentGame = await gamesModel.findByIdAndUpdate(
          { _id: gameId},
          {
            $push: {
               hole2: {
              $each: [
                { score: data[1].player1.score, name: data[1].player1.name, id: data[1].player1.id },
                { score: data[2].player2.score, name: data[2].player2.name, id: data[2].player2.id },
                { score: data[3].player3.score, name: data[3].player3.name, id: data[3].player3.id },
                { score: data[4].player4.score, name: data[4].player4.name, id: data[4].player4.id },
              ]
            }
            }
          }
        )
        socket.emit('hole2', (currentGame))
      } catch (error) {
        console.log(error)
    }
  })

  socket.on('hole3', async (data) => {
    try {
        const gameId = data[0].gameId;
        console.log(gameId);
        const currentGame = await gamesModel.findByIdAndUpdate(
          { _id: gameId},
          {
            $push: {
               hole3: {
              $each: [ 
                { score: data[1].player1.score, name: data[1].player1.name, id: data[1].player1.id },
                { score: data[2].player2.score, name: data[2].player2.name, id: data[2].player2.id },
                { score: data[3].player3.score, name: data[3].player3.name, id: data[3].player3.id },
                { score: data[4].player4.score, name: data[4].player4.name, id: data[4].player4.id }
              ]
            }
            }
          }
        )
        socket.emit('hole3', (currentGame))
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