import { IUser } from '@modules/users/domain/models/IUser';

export interface IPost {
  id: string;
  title: string;
  content: string;
  user: IUser;
  published: Date;
  updated: Date;
}
