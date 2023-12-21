import { Joi } from 'celebrate';

export const createEmailValidation = {
    body: {
        subject: Joi.string().required(),
        body: Joi.string().required(),
    },
};

export const unsubscribeValidation = {
    params: {
        id: Joi.string().hex().length(24).required(),
    },
};

export const recipientsValidation = {
    body: {
            recipients: Joi.array().items(Joi.string().email()).required(),
    },
};
