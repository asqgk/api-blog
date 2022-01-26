import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      image: Joi.string(),
    },
  }),
  usersController.create,
);

usersRouter.delete('/me', isAuthenticated, usersController.delete);

// usersRouter.patch(
//   '/avatar',
//   isAuthenticated,
//   upload.single('avatar'),
//   usersAvatarController.update,
// );

export default usersRouter;
