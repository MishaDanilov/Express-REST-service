import * as Joi from '@hapi/joi';

export const userSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string(),
});
