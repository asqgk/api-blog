import { IUser } from '@modules/users/domain/models/IUser';

export interface IListPosts {
  id: string;
  published: Date;
  updated: Date;
  title: string;
  content: string;
  user: IUser[];
}
