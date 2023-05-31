import { Schema, mongoose } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    roles: [
        {
            type: String,
            ref: 'Role'
        }
    ]
})
export const User = mongoose.model('User', userSchema)