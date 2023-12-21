import { Router } from 'express'
// Importing the email controller functions
import * as emailController from '../controller/email.controller'
import { celebrate } from 'celebrate';
import { unsubscribeValidation, createEmailValidation } from '../middleware/validators';

// Creating an instance of the Router
const router = Router();

// Routes for email requests
router.post('/', celebrate(createEmailValidation), emailController.CreateEmail)
router.get('/', emailController.GetOutgoingEmails)
router.patch('/:id', celebrate(unsubscribeValidation), emailController.Unsubscribe)

export default router;