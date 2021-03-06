import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PostsController from '../controllers/PostsController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const postsRouter = Router();
const postsController = new PostsController();

postsRouter.use(isAuthenticated);

postsRouter.get('/', postsController.index);

postsRouter.get('/search', postsController.search);

postsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  postsController.show,
);

postsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
  }),
  postsController.create,
);

postsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      content: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  postsController.update,
);

postsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  postsController.delete,
);

export default postsRouter;
