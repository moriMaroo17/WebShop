import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }
})


userSchema.methods.addToCart = function(course) {
    const items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if (idx >= 0) {
        items[idx].count++
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items}
    return this.save()
}

const User = mongoose.model('User', userSchema)
export { User }