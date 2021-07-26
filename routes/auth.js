import { Router } from "express"
import User from '../models/user.js'


const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('60e5c32691f7a108a4a5a4bf')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/')
    })
})

export {router as authRoutes}