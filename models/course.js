import mongoose from 'mongoose'
// import { Schema, model } from 'mongoose'

const courseSchema = new mongoose.Schema({
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

courseSchema.method('toClient', function() {
    const course = this.toObject()

    course.id = course._id
    delete course._id
    
    return course.id
})

// module.exports = model('Course', course)
export default mongoose.model('Course', courseSchema)