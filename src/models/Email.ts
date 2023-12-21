import {Schema, model} from 'mongoose'

const EmailsSchema = new Schema({
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
        default: true
    },
    creation_date: {
        type: Date,
    },
})

export default model('Email', EmailsSchema)