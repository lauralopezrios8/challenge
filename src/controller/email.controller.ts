import { Request, Response } from 'express'
import mongoose from 'mongoose';
import Email from '../model/Email'


//Add email to list of outgoing emails
export async function CreateEmail(req: Request, res: Response) {
    const { to, subject, body } = req.body

    const newEmail = { from: '"Tabella" <lauralopez.test8@gmail.com>', subject: subject, body: body, is_subscribed: 'true', creation_date: new Date() }

    const email = new Email(newEmail)
    await email.save()

    return res.json({
        message: 'Email successfuly saved',
        email
    })
}

//List outgoing emails
export async function GetOutgoingEmails(req: Request, res: Response) {

    const [outEmails] = await Promise.all([
        Email.find({})
    ]);

    return res.json({
        outEmails
    })
} 

//Mark email as unsubscribed
export async function Unsubscribe(req: Request, res: Response) {
    
    const { id } = req.params;

// First check if ID format is valid
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     res.status(400).json({ error: 'Invalid ID format. Please try again.' });
    //     return;
    // }

    const email = await Email.findById(id);

    // Validate if email is found
    if (!email) {
        res.status(404).json({ error: 'Email not found' });
        return;
    }

    email.is_subscribed = false;

    await email.save();

    return res.status(200).json({ message: 'Email subscription updated successfully', email });

}



