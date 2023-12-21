import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser  from 'body-parser'
import emailRoutes from './routes/email.routes'
import submisionsRoutes from './routes/submissions.routes'


import './databases'

const app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(app.get('port'))
console.log('Server on port', app.get('port'))

//routes
app.get('/', (req, res) => {
    res.send({ message: 'Welcome' })
})


app.use('/emails', emailRoutes)
app.use('/submissions', submisionsRoutes)

export default app;
