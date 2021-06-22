import { Router } from "express"
import { Course } from "../models/course.js"


const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        'title': 'Курсы',
        'isCourses': true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('course', {
        layout: 'empty',
        'title': `Курс ${course.title}`,
        course
    })
})

export {router as coursesRoutes}