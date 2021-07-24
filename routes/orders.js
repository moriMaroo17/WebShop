import { Router } from 'express'
import { Order } from '../models/order.js'


const router = Router()

router.get('/', async (req, res) => {
    res.render('orders', {
        isOrder: true,
        title: 'Заказы'
    })
})

router.post('/', async (req, res) => {
    res.redirect('/orders')
})

export {router as ordersRoutes}