import { isCelebrateError } from 'celebrate'
import { NextFunction, Request, Response } from 'express'

export const appError = (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction
): Response => {
  if (isCelebrateError(err)) {
    const validationErrors: Record<string, string> = {}

    err.details.forEach(detail => {
      detail.details.forEach(nestedDetail => {
        const key = nestedDetail.context?.key || 'unknown'
        const message = nestedDetail.message
        validationErrors[key] = message
      })
    })

    return response.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: validationErrors
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
}