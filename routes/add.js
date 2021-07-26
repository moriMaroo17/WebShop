import { Router } from "express"
import Course from "../models/course.js"
import auth from '../middleware/auth.js'


const router = Router()

router.get('/', auth, (req, res) => {
    res.render('add', {
        'title': 'Добавить курс',
        'isAdd': true
    })
})

router.post('/', auth, async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch (error) {
        console.log(error)
    }

    
})

export {router as addRoutes}