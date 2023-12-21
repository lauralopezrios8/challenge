import { Router } from 'express'
// Importing the submission controller functions
import * as submissionsController from '../controller/submissions.controller'
import { celebrate } from 'celebrate';
import { recipientsValidation } from '../middleware/validators';

// Creating an instance of the Router
const router = Router();

// Routes for submissions requests
router.post('/', celebrate(recipientsValidation), submissionsController.SendEmails)
router.get('/', submissionsController.GetSentEmails)

export default router;