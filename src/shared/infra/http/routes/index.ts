import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import postsRouter from '@modules/posts/infra/http/routes/post.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/post', postsRouter);

export default routes;
