import { PostEntity } from 'src/post/entities/post.entity';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
