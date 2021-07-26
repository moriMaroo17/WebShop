import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: String,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Order', orderSchema)