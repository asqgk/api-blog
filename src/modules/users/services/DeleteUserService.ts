import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteUser } from '../domain/models/IDeleteUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IDeleteUser): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existe.', 404);
    }

    await this.usersRepository.remove(user);
  }
}

export default DeleteUserService;
