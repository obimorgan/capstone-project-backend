import { model, Schema } from 'mongoose'
import { ISingleGame } from '../../interface'

export const holesSchema = new Schema<ISingleGame>({
    gameName: { type: Schema.Types.ObjectId, ref: 'Games' },
    gamePin: String,
    hole1: { type: Number, defult: 0},
    hole2: { type: Number, defult: 0},
    hole3: { type: Number, defult: 0},
    hole4: { type: Number, defult: 0},
    hole5: { type: Number, defult: 0},
    hole6: { type: Number, defult: 0},
    hole7: { type: Number, defult: 0},
    hole8: { type: Number, defult: 0},
    hole9: { type: Number, defult: 0},
    hole10: { type: Number, defult: 0},
    hole11: { type: Number, defult: 0},
    hole12: { type: Number, defult: 0},
    hole13: { type: Number, defult: 0},
    hole14: { type: Number, defult: 0},
    hole15: { type: Number, defult: 0},
    hole16: { type: Number, defult: 0},
    hole17: { type: Number, defult: 0},
    hole18: { type: Number, defult: 0},
    hole19: { type: Number, defult: 0},
})

