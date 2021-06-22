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

export {router as coursesRoutes}