import { Router } from 'express'
import { emailRoutes } from './emails.routes'
import { submissionsRoutes } from './submissions.routes'

const routes = Router()

routes.use('/emails', emailRoutes)
routes.use('/submissions', submissionsRoutes)

export { routes }