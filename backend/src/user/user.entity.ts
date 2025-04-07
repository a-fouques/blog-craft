import { Exclude } from 'class-transformer';
import { Blog } from 'src/blog/blog.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export type UserRole = 'user' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 'user' })
  role: UserRole;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];
}
