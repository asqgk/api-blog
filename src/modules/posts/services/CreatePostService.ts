import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IResponsePost } from '../domain/models/IResponsePost';
import { IRequestCreatePost } from '../domain/models/IRequestCreatePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    title,
    content,
    user_id,
  }: IRequestCreatePost): Promise<IResponsePost> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('Could not find any user with the given id.');
    }

    await this.postsRepository.create({
      title,
      content,
      user: userExists,
    });

    return {
      title,
      content,
      user_id,
    };
  }
}

export default CreatePostService;
