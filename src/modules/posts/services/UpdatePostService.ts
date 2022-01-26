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
  ) {}

  public async execute({ id, title, content }: IUpdatePost): Promise<IPost> {
    const post = await this.postsRepository.findById(id);

    if (!post) {
      throw new AppError('Post not found.');
    }

    post.title = title;
    post.content = content;

    await this.postsRepository.save(post);

    return post;
  }
}

export default UpdatePostService;
