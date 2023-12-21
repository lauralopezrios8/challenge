import { Router } from 'express'
import { celebrate } from 'celebrate'

import { EmailController } from '../controllers/email.controller'
import { unsubscribeValidation, createEmailValidation } from '../validators';

const emailRoutes = Router()
const emailController = new EmailController()

emailRoutes.post('/', celebrate(createEmailValidation), emailController.create)
emailRoutes.get('/', emailController.list)
emailRoutes.patch('/:id', celebrate(unsubscribeValidation), emailController.unsubscribe)

export { emailRoutes };