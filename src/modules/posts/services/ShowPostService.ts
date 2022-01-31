import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IShowPost } from '../domain/models/IShowPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IShowPost): Promise<IPost> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post não existe', 404);
    }

    delete post.user.password;

    return post;
  }
}

export default ShowPostService;
