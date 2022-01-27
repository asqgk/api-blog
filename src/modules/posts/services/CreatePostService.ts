import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IResponsePost } from '../domain/models/IResponsePost';
import { IRequestCreatePost } from '../domain/models/IRequestCreatePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const post = await this.postsRepository.create({
      title,
      content,
      user: userExists,
    });

    console.log(post);

    return {
      title,
      content,
      user_id,
    };
  }
}

export default CreatePostService;
