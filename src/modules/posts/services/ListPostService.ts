import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class ListPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IPost[]> {
    const posts = await this.postsRepository.findAll();

    return posts;
  }
}

export default ListPostService;
