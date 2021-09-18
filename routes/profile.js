import { Router } from 'express'
import auth from '../middleware/auth.js'


const router = Router()

router.get('/', (req, res) => {
    res.render('profile', {
        title: 'Профиль',
        isProfile: true,
        user: req.user.toObject()
    })
})

router.post('/', (req, res) => {

})

export { router as profileRoutes }