import { ConsentType } from '@models/Consent';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const createEventValidator = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    user: Joi.object({
      id: Joi.string().guid().required(),
    }).required(),
    consents: Joi.array().items(
      Joi.object({
        id: Joi.string().valid(...Object.values(ConsentType)).required(),
        enabled: Joi.boolean().required(),
      }),
    ).required(),
  });

  const options = {
    abortEarly: true,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);
  if (error) return res.status(422).json({ error: error.message });

  req.body = value;
  return next();
};