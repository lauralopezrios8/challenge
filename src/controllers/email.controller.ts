import { Request, Response } from 'express'

import Email from '../models/Email'


export class EmailController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { to, subject, body } = request.body

    const newEmail = { from: '"Tabella" <leonardofreitasdev@gmail.com>', subject: subject, body: body, is_subscribed: 'true', creation_date: new Date() }

    const email = new Email(newEmail)
    await email.save()

        return response.json({
            message: 'Email successfuly saved',
            email
        })
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const [outEmails] = await Promise.all([
            Email.find({})
        ]);
    
        return response.json({
            outEmails
        })
    }

    public async unsubscribe(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const email = await Email.findById(id);

        if (!email) {
            return response.status(404).json({ error: 'Email not found' });
        }

        await email.save();

        return response.status(200).json({ message: 'Email subscription updated successfully', email });
    }
}


