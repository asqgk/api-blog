// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreatePost } from '../domain/models/ICreatePost';
import { IPostUser } from '../domain/models/IPostUser';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    title,
    content,
    userId,
  }: ICreatePost): Promise<IPostUser> {
    await this.postsRepository.create({
      title,
      content,
      userId,
    });

    return {
      title,
      content,
      userId,
    };
  }
}

export default CreatePostService;
