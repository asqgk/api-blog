import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { ISearchPost } from '../domain/models/ISearchPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class SearchPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ param }: ISearchPost): Promise<IPost[]> {
    const posts = await this.postsRepository.findAll();

    const filteredPosts = posts.filter(post => {
      return post.content.includes(param) || post.title.includes(param);
    });

    if (!posts) {
      throw new AppError('Post not found.');
    }

    return filteredPosts.map(post => {
      delete post.user.password;
      return post;
    });
  }
}

export default SearchPostsService;
