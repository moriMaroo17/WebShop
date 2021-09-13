import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import csrf from 'csurf'
import flash from 'connect-flash'
import mongose from 'mongoose'
import exphbs from 'express-handlebars'
import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
const MongoStore = ConnectMongoDBSession(session)

import { homeRoutes } from './routes/home.js';
import { coursesRoutes } from './routes/courses.js'
import { addRoutes } from './routes/add.js'
import { cardRoutes } from './routes/card.js'
import { ordersRoutes } from './routes/orders.js'
import { authRoutes } from './routes/auth.js'
import varMiddleware from './middleware/variables.js'
import userMiddleware from './middleware/user.js'
import ifeq from './utils/hbs-helpers.js'
// import keys from './keys/index.js'
import { createRequire } from "module"

const require = createRequire(import.meta.url)

const keys = require('./keys')

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: ifeq
})

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)





async function start() {
    try {
        await mongose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }

}

start()

