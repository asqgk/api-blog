import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IPost } from '@modules/posts/domain/models/IPost';

@Entity('posts')
class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  published: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default Post;
