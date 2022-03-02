import { model, Schema } from 'mongoose'
import { IHoles } from '../../interface'

export const holesSchema = new Schema<IHoles>({
    gameName: {type: Schema.Types.ObjectId, ref: 'Games'},
    hole1: Number,
    hole2: Number,
    hole3: Number,
    hole4: Number,
    hole5: Number,
    hole6: Number,
    hole7: Number,
    hole8: Number,
    hole9: Number,
    hole10: Number,
    hole11: Number,
    hole12: Number,
    hole13: Number,
    hole14: Number,
    hole15: Number,
    hole16: Number,
    hole17: Number,
    hole18: Number,
    hole19: Number,
})

