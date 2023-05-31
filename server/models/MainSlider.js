import { Schema, mongoose } from 'mongoose'

const mainSliderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    images: [
        {
            type: Object,
        }
    ],
    desc: {
        type: String,
    },
    index: {
        type: Number
    },
    radio: {
        type: String,
        default: '#333'
    }
})
export const MainSlider = mongoose.model('MainSlider', mainSliderSchema)