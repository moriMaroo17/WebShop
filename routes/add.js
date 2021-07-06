import { Router } from "express"
import {Course} from "../models/course.js"
// const Course = require('../models/course').default


const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        'title': 'Добавить курс',
        'isAdd': true
    })
})

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch (error) {
        console.log(error)
    }

    
})

export {router as addRoutes}