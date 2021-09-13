import { body } from 'express-validator/check/index.js'
import User from '../models/user.js'

const registerValidators = [
    body('email').isEmail().withMessage('Введите корректный email').custom(async (value, {req}) => {
        try {
            const user = await User.findOne({ email: value })
            if (user) {
                return Promise.reject('Такой email уже занят')
            }
        } catch (error) {
            console.log(error)
        }
    }),
    body('password', 'Введите пароль длинной 6-56 символов из латинских букв и цифр').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Пароли должны совпадать')
        }
        return true
    }),
    body('name').isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа')
]

export { registerValidators }