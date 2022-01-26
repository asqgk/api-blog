import { inject, injectable } from 'tsyringe';
import { IListPosts } from '../domain/models/IListPosts';
// import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<IListPosts[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}

export default ListPostService;
