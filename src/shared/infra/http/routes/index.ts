import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import customersRouter from '@modules/customers/infra/http/routes/customer.routes';
import postsRouter from '@modules/posts/infra/http/routes/post.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', sessionsRouter);
routes.use('/post', postsRouter);

routes.use('/password', passwordRouter);
routes.use('/customers', customersRouter);

export default routes;
