import { Router } from 'express'
import { celebrate } from 'celebrate'

import { SubmissionController } from '../controllers/submission.controller'
import { recipientsValidation } from '../validators';

const submissionsRoutes = Router()
const submissionController = new SubmissionController()

submissionsRoutes.post('/', celebrate(recipientsValidation), submissionController.send)
submissionsRoutes.get('/', submissionController.listSentEmails)

export { submissionsRoutes };