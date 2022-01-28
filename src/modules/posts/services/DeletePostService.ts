import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeletePost } from '../domain/models/IDeletePost';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, user_id }: IDeletePost): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post não existe.', 404);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    if (user.id !== post.user.id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    await this.postsRepository.remove(post);
  }
}

export default DeletePostService;
