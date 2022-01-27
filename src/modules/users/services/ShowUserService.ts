import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existe.', 404);
    }

    return user;
  }
}

export default ShowUserService;
