import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';

import '@modules/users/providers';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
