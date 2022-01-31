import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IUpdatePost } from '../domain/models/IUpdatePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    title,
    content,
    user_id,
  }: IUpdatePost): Promise<IPost> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post não existe.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

    if (user.id !== post.user.id) {
      throw new AppError('Usuário não autorizado', 401);
    }

    post.title = title;
    post.content = content;

    delete post.user.password;

    await this.postsRepository.save(post);

    return post;
  }
}

export default UpdatePostService;
