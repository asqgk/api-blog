import { ICreatePost } from '@modules/posts/domain/models/ICreatePost';
import { IListPosts } from '@modules/posts/domain/models/IListPosts';
import { IPost } from '@modules/posts/domain/models/IPost';
import { IPostsRepository } from '@modules/posts/domain/repositories/IPostsRepository';
import { getRepository, Repository } from 'typeorm';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({ title, content, user }: ICreatePost): Promise<IPost> {
    const post = this.ormRepository.create({ title, content, user });

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    await this.ormRepository.save(post);

    return post;
  }

  public async remove(post: Post): Promise<void> {
    await this.ormRepository.remove(post);
  }

  public async findAll(): Promise<IPost[]> {
    const posts = await this.ormRepository.find({
      join: {
        alias: 'posts',
        leftJoinAndSelect: {
          users: 'posts.user_id',
        },
      },
    });

    // const posts = await this.ormRepository.find();

    console.log(posts);

    return posts;
  }

  // public async findByName(name: string): Promise<Post | undefined> {
  //   const customer = await this.ormRepository.findOne({
  //     where: {
  //       name,
  //     },
  //   });

  //   return customer;
  // }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);

    return post;
  }

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
