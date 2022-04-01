/** @format */

import { model, Schema } from 'mongoose'
import { IAdmin, ISingleRule } from '../../interface'

const rulesSchema = new Schema<ISingleRule>({
	rule: String,
})
export const adminSchema = new Schema<IAdmin>(
	{
		rules: [rulesSchema],
	},
	{ timestamps: true },
)

const adminModel = model('Admin', adminSchema)
export default adminModel
