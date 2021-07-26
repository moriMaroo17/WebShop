import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import mongose from 'mongoose'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import session from 'express-session';

import { homeRoutes } from './routes/home.js';
import { coursesRoutes } from './routes/courses.js'
import { addRoutes } from './routes/add.js'
import { cardRoutes } from './routes/card.js'
import { ordersRoutes} from './routes/orders.js'
import { authRoutes } from './routes/auth.js'
import User from './models/user.js'
import varMiddleware from './middleware/variables.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)



const PORT = process.env.PORT || 3000

async function start() {
    try {
        const dbName = 'webShop'
        const password = 'admin'
        const url = `mongodb+srv://admin:${password}@cluster0.5rkxc.mongodb.net/${dbName}?retryWrites=true&w=majority`
        await mongose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        // const candidate = await User.findOne()
        // if (!candidate) {
        //     const user = new User({
        //         email: 'user@gmail.com',
        //         name: 'SimpleUser',
        //         cart: {items: []}
        //     })
        //     await user.save()
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }

}

start()

