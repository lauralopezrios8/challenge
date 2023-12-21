import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import './configs/database'
import { routes } from './routes'
import { appError } from './middlewares/appErrors'

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(morgan('dev'))


app.use('/', routes)

app.use(appError)

export { app }
