import Joi from 'joi'

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).max(20).required()
});


export const validateSchema = (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).json({ message: result.error.message });
    } else {
        next();
    }
};

