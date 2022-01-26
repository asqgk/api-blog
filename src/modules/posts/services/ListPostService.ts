import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute(): Promise<IPost[]> {
    const posts = await this.postsRepository.findAllPaginate();

    return posts;
  }
}

export default ListPostService;
