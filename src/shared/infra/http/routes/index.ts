import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import customersRouter from '@modules/customers/infra/http/routes/customer.routes';
import ordersRouter from '@modules/orders/infra/http/routes/order.route';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/login', sessionsRouter);

routes.use('/password', passwordRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
