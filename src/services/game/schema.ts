import { model, Schema } from 'mongoose'
import { IHole } from '../../interface'

const holesSchema = new Schema<IHole>({
    player: { type: String, required: true },
    score: { type: Number, default: 0 },
})

export const gameSchema = new Schema({
    gamePin: Number,
    gameName: String,
    players: [
        {
            player: { type: String, ref: 'User' },
            playing: { type: Boolean },
            name: { type: String, ref: 'User' },
            avatar: { type: String, ref: 'User' },
        }
    ],
    hole1: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole2: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole3: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole4: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole5: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole6: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole7: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole8: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole9: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole10: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole11: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
     hole12: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole13: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole14: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole15: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole16: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole17: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],
    hole18: [
        {
            name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
                {
            name: String,
           id: { type: String, ref: 'User' },
            score: Number,
        },
                        {
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        },
        {
                                    
           name: String,
            id: { type: String, ref: 'User' },
            score: Number,
        }
    ],

}, { timestamps: true })

const gameRoomSchema = new Schema({
    players: [{ type: String, ref: 'User' }],
    games: [gameSchema]
})
const gameModel = model('Games', gameSchema)
export default gameModel