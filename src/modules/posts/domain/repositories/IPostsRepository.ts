import { ICreatePost } from '../models/ICreatePost';
import { IPost } from '../models/IPost';

export interface IPostsRepository {
  findAll(): Promise<IPost[]>;
  findById(id: string): Promise<IPost | undefined>;
  create(data: ICreatePost): Promise<IPost>;
  save(post: IPost): Promise<IPost>;
  remove(post: IPost): Promise<void>;
}
