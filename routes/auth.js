import { Router } from "express"


const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

export {router as authRoutes}