import { Schema, mongoose } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    icon: {
        type: Object,
    },
    color: {
        type: String,
        default: "#333333"
    },
    index: {
        type: String,
    }
})
export const Category = mongoose.model('Category', categorySchema)

