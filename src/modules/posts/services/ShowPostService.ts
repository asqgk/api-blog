import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<IPost> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found.');
    }

    return post;
  }
}

export default ShowPostService;
