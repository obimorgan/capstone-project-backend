import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser, IUserModel } from '../../interface.d'


const userSchema = new Schema<IUser>({
    name: String,
    email: { typestring: 'string', required: true },
    password: { typestring: 'string', required: true },
    filename: String,
    avatar: String,
    facebokId: String,
    googleId: String,
    instagramId: String,
    refreshToken: String,
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const newUser = this
    const plainPW = this.password
    if (newUser.isModified('password')) {
        const hashedPW = await bcrypt.hash(plainPW, 12)
        newUser.password = hashedPW
    }
    next()
})

userSchema.methods.toJSON = function () {
    const userDocument = this
    const userObj = userDocument.toObject()
    delete userObj.password
    delete userObj.__v
    delete userObj.refreshJWTs
    return userObj
}

userSchema.statics.authenticate = async function (email, plainPW) {
    const user = await this.findOne({ email })
    if (user) {
        const pwMatch = await bcrypt.compare(plainPW, user.password)
        if (pwMatch) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}

const UserModel = model<IUser, IUserModel>('User', userSchema)
export default UserModel