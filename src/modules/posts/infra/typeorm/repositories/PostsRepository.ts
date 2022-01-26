import { ICreatePost } from '@modules/posts/domain/models/ICreatePost';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';
import { getRepository, Repository } from 'typeorm';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({ title, content }: ICreatePost): Promise<Post> {
    const post = this.ormRepository.create({ title, content });

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    await this.ormRepository.save(post);

    return post;
  }

  // public async remove(customer: Customer): Promise<void> {
  //   await this.ormRepository.remove(customer);
  // }

  // public async findAllPaginate(): Promise<ICustomerPaginate> {
  //   const customers = await this.ormRepository.createQueryBuilder().paginate();

  //   return customers as ICustomerPaginate;
  // }

  // public async findByName(name: string): Promise<Post | undefined> {
  //   const customer = await this.ormRepository.findOne({
  //     where: {
  //       name,
  //     },
  //   });

  //   return customer;
  // }

  // public async findById(id: string): Promise<Post | undefined> {
  //   const customer = await this.ormRepository.findOne(id);

  //   return customer;
  // }

  // public async findByEmail(email: string): Promise<Post | undefined> {
  //   const customer = await this.ormRepository.findOne({
  //     where: {
  //       email,
  //     },
  //   });

  //   return customer;
  // }
}

export default PostsRepository;
