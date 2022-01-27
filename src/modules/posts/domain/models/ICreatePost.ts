import { IUser } from '@modules/users/domain/models/IUser';

export interface ICreatePost {
  title: string;
  content: string;
  user: IUser;
}
