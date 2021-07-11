import * as Joi from '@hapi/joi';

export const boardSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      order: Joi.number(),
    }),
  ),
});
