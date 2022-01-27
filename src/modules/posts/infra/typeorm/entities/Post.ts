import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import { IPost } from '@modules/posts/domain/models/IPost';

@Entity('posts')
class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  published: Date;

  @UpdateDateColumn()
  updated: Date;
}

export default Post;
