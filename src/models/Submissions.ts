import {Schema, model} from 'mongoose'

const SubmissionsSchema = new Schema({
    to: {
        type: String,
    },
    from: {
        type: String,
    },
    subject: {
        type: String,
    },
    body: {
        type: String,
    },
    is_subscribed: {
        type: Boolean,
    },
    submission_date: {
        type: Date,
    },
})

export default model('Submission', SubmissionsSchema)