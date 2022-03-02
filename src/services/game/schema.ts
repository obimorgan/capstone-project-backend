import { model, Schema } from 'mongoose'
import { holesSchema } from './holesSchema'

const gameSchema = new Schema({
    gameName: String,
    users: { type: Schema.Types.ObjectId, ref: 'User' },
    scores: [holesSchema]
}, { timestamps: true })

const gameRoomSchema = new Schema({
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    games: [gameSchema]
})
const gameModel = model('Games', gameSchema)
export default gameModel