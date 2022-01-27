import { ICreatePost } from '../models/ICreatePost';
// import { IListPosts } from '../models/IListPosts';
import { IPost } from '../models/IPost';

export interface IPostsRepository {
  findAll(): Promise<IPost[]>;
  // findByName(name: string): Promise<IPost | undefined>;
  findById(id: string): Promise<IPost | undefined>;
  // findByEmail(email: string): Promise<IPost | undefined>;
  create(data: ICreatePost): Promise<IPost>;
  save(post: IPost): Promise<IPost>;
  remove(post: IPost): Promise<void>;
}
