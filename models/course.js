import mongoose from 'mongoose'
// import { Schema, model } from 'mongoose'

const course = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// module.exports = model('Course', course)
const Course = mongoose.model('Course', course)
export { Course }