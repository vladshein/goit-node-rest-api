import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
        "any.required": "name is required",
        "base.string": "name must be a string",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "email is required",
        "base.string": "email must be a valid string",
    }),
    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-]{7,15}$/)
        .required()
        .messages({
            "any.required": "phone is required",
            "base.string": "phone must be a valid string",
        }),
    favorite: Joi.boolean().required().messages({
        "boolean.base": '"favorite" must be true or false',
        "any.required": '"favorite" is a required field',
    }),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(2).max(50).messages({
        "base.string": "name must be a valid string",
    }),
    email: Joi.string().email().messages({
        "base.string": "email must be a valid string",
    }),
    phone: Joi.string()
        .pattern(/^\+?[0-9\s\-]{7,15}$/)
        .messages({
            "base.string": "phone must be a valid string",
        }),
    favorite: Joi.boolean().messages({
        "boolean.base": '"favorite" must be true or false',
    }),
})
    .min(1)
    .messages({ "object.min": "Body must have at least one field" });

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "boolean.base": '"favorite" must be true or false',
        "any.required": '"favorite" is a required field',
    }),
});
