import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import exphbs from 'express-handlebars'
import { homeRoutes } from './routes/home.js';
import { coursesRoutes } from './routes/courses.js'
import { addRoutes } from './routes/add.js'
import { cardRoutes } from './routes/card.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)





const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})