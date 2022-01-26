import { ICreatePost } from '../models/ICreatePost';
import { IListPosts } from '../models/IListPosts';
import { IPost } from '../models/IPost';
import { IPostUser } from '../models/IPostUser';

export interface IPostsRepository {
  findAll(): Promise<IListPosts[]>;
  // findByName(name: string): Promise<IPost | undefined>;
  findById(id: string): Promise<IPost | undefined>;
  // findByEmail(email: string): Promise<IPost | undefined>;
  create(data: ICreatePost): Promise<IPostUser>;
  save(post: IPost): Promise<IPost>;
  remove(post: IPost): Promise<void>;
}
