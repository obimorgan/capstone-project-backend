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
            playerId: { type: Schema.Types.ObjectId, ref: 'User' },
            playing: { type: Boolean },
            name: { type: String, ref: 'User' },
            avatar: { type: String, ref: 'User' },
            totalScore: Number
        }
    ],
    hole1: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole2: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole3: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole4: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole5: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole6: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole7: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole8: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole9: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole10: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole11: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
     hole12: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole13: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole14: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole15: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole16: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole17: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],
    hole18: [
        {
            name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                {
            name: String,
           playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
                        {
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        },
        {
                                    
           name: String,
            playerId: { type: Schema.Types.ObjectId, String, ref: 'User' },
            score: Number,
            totalScore: Number,
        }
    ],

}, { timestamps: true })

const gameRoomSchema = new Schema({
    players: [{ type: String, ref: 'User' }],
    games: [gameSchema]
})
const gameModel = model('Games', gameSchema)
export default gameModel