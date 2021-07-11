import * as Joi from '@hapi/joi';

export const taskSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string().allow(null),
  userId: Joi.string().allow(null),
  columnId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
});
