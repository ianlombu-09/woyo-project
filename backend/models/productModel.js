import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true

    }
)

const productSchema = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User'
        },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        brand: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        reviews: [reviewSchema],

        rating: {
            type: Number,
            require: true,
            default: 0
        },

        price: {
            type: Number,
            require: true,
            default: 0
        },

        countInStock: {
            type: Number,
            require: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product