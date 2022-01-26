import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeletePost } from '../domain/models/IDeletePost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IDeletePost): Promise<void> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found.');
    }

    await this.postsRepository.remove(post);
  }
}

export default DeletePostService;
