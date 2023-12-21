import { Request, Response } from 'express'

import Email from '../models/Email'
import Submissions from '../models/Submissions'

import { mockTemplate } from '../templates/mockTemplate';
import { transporter } from '../configs/nodemailer';

export class SubmissionController {
    public async send(request: Request, response: Response): Promise<Response> {
        const { recipients } = request.body

        const [outEmails] = await Promise.all([
            Email.find({ is_subscribed: true })
        ]);

        if (outEmails && outEmails.length > 0) {

            for (const outEmail of outEmails) {
                    for (const to of recipients) {
                        const fromAddress: string = `"Tabella" <${process.env.EMAIL_FROM_EMAIL}>`;
                        const subject: string = outEmail.subject || 'Hello Tabella';
                        const body: string = outEmail.body || 'This is a default body';

                        const mailOptions = {
                            to: to,
                            from: fromAddress,
                            subject: subject,
                            text: body,
                            html: mockTemplate(subject, body)
                        };

                    try {
                        await transporter.sendMail(mailOptions);

                        //If email is sent successfully, add it to submissions
                        const sentEmail = { to: to, from: outEmail.from, subject: outEmail.subject, body: outEmail.body, is_subscribed: outEmail.is_subscribed, submission_date: new Date() }
                        const submission = new Submissions(sentEmail)
                        await submission.save()

                        //If email is sent successfully, delete it from the outgoing list
                        await Email.findByIdAndDelete(outEmail.id)

                    } catch (error) {
                        console.error(error);
                        return response.status(500).json({ message: 'Failed to send email' });
                    }
                }
            }

            return response.sendStatus(204).json({})
    
        } else {
            return response.json({ message: 'Outgoing emails not found. Please add an email first.' });
        }
    }

    public async listSentEmails(request: Request, response: Response): Promise<Response> {
        const [sentEmails] = await Promise.all([
            Submissions.find({})
        ]);
    
        return response.json({
            sentEmails
        })
    }
}

