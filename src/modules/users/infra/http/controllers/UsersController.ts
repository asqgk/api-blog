import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import ListUserService from '@modules/users/services/ListUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUserService);

    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const user_id = id;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { displayName, email, password, image } = request.body;

    const createUser = container.resolve(CreateUserService);

    await createUser.execute({
      displayName,
      email,
      password,
      image,
    });

    const generateToken = container.resolve(CreateSessionsService);

    const token = await generateToken.execute({
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(token));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(204).json();
  }
}
