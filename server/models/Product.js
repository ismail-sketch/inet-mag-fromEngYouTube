import { Schema, mongoose } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    richDescription: {
        type: String,
        default: ''
    },
    images: [{
        type: Object,
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFuetured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        // default: Date.now,
        default: new Date()
    },
    index: {
        type: String
    }
})
export const Product = mongoose.model('Product', productSchema)

