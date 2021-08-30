import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
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

export const getUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    idUser: Joi.string().uuid().required(),
  });

  const options = {
    abortEarly: true,
    allowUnknown: false,
  };

  const { error, value } = schema.validate(req.params, options);
  if (error) return res.status(422).json({ error: error.message });

  req.body = value;
  return next();
};

export const deleteUserValidator = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    idUser: Joi.string().uuid().required(),
  });

  const options = {
    abortEarly: true,
    allowUnknown: false,
  };

  const { error, value } = schema.validate(req.params, options);
  if (error) return res.status(422).json({ error: error.message });

  req.body = value;
  return next();
};