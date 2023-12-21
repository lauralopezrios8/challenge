import express, { Request, Response } from 'express'
import Email from '../model/Email'
import Submissions from '../model/Submissions'
import nodemailer from 'nodemailer';

const app = express();

//Send emails
export async function SendEmails(req: Request, res: Response) {
    const { recipients } = req.body

    const [outEmails] = await Promise.all([
        Email.find({ is_subscribed: true })
    ]);

    // Check if there's outgoing emails to be sent
    if (outEmails && outEmails.length > 0) {

        // Nodemailer setup 
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "lauralopez.test8@gmail.com",
                pass: "wddg xcjv puwd sdxm",
            },
        });

        for (const outEmail of outEmails) {
            for (const to of recipients) {

                // Common email options

                // Ensure that fields are strings and not null or undefined
                const fromAddress: string = outEmail.from || '"Tabella" <lauralopez.test8@gmail.com>';
                const subject: string = outEmail.subject || 'Hello Tabella';
                const body: string = outEmail.body || 'This is a default body';

                const mailOptions = {
                    to: to,
                    from: fromAddress,
                    subject: subject,
                    text: body,
                    html: 
                    `<html>
                        <head>
                            <style>
                            body {
                                font-family: 'Arial', sans - serif;
                                background - color: #f4f4f4;
                                color: #333;
                            }
                            p {
                                font - size: 16px;
                                line - height: 1.5;
                                margin - bottom: 15px;
                            }
                            h2 {
                                color: purple;
                            }
        
                            footer {
                                margin - top: 20px;
                                padding - top: 10px;
                                border - top: 1px solid #ddd;
                                text - align: center;
                                color: #777;
                            }
                            </style>
                < /head>
                < body >
                <h2>${ subject } </h2>
                    < p > ${ body } </p>
                        < footer >
                          <p>& copy; 2023 Tabella.All rights reserved.< /p>
                        < /footer>
                      < /body>
                  < /html>`
                            , // html body
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
            return res.status(500).json({ message: 'Failed to send email' });
        }
    }
}
return res.json({ message: 'Emails sent successfully' });
    } else {
    return res.json({ message: 'Outgoing emails not found. Please add an email first.' });
}

}

//List submissions
export async function GetSentEmails(req: Request, res: Response) {

    const [sentEmails] = await Promise.all([
        Submissions.find({})
    ]);

    return res.json({
        sentEmails
    })
}


