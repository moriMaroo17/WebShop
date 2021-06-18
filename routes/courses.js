import { Router } from "express"


const router = Router()

router.get('/', (req, res) => {
    res.render('courses', {
        'title': 'Курсы',
        'isCourses': true
    })
})

export {router as coursesRoutes}