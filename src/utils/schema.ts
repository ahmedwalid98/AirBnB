import Joi from "joi"

export const createUserSchema = Joi.object({
    first_name: Joi.string().min(5).max(20).required(),
    last_name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})
