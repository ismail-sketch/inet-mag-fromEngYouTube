import { Schema, mongoose } from 'mongoose'

const roleSchema = new Schema({
    value: {
        type: String,
        unique: true,
        default: "USER"
    },

})
export const Role = mongoose.model('Role', roleSchema)