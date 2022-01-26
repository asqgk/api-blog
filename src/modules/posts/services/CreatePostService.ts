// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreatePost } from '../domain/models/ICreatePost';
import { IPost } from '../domain/models/IPost';
import { IPostsRepository } from '../domain/repositories/IPostsRepository';

@injectable()
class CreatePostService {
  constructor(
    @inject('CustomersRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ title, content }: ICreatePost): Promise<IPost> {
    // const emailExists = await this.postsRepository.findByEmail(email);

    // if (emailExists) {
    //   throw new AppError('Email address already used.');
    // }

    // método 'create' cria e salva
    const post = await this.postsRepository.create({
      title,
      content,
    });

    return post;
  }
}

export default CreatePostService;
