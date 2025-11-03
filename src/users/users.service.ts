import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/profiles/entities/profile.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const roles = await this.roleRepository.findBy({
      id: In(createUserDto.roleIds),
    });
    console.log('roles', roles);
    const payload: Partial<UserEntity> = {
      ...createUserDto,
      roles,
    };
    return this.userRepository.save(payload);
  }

  findAll() {
    const allUsers = this.userRepository.find({
      relations: { profile: true, posts: true },
    });
    allUsers
      .then((users) => {
        console.log('users', users);
        users.forEach((user) => {
          console.log('user.posts', user?.posts);
          // user?.posts?.forEach((post) => {
          //   console.log('post', post);
          // });
        });
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
    return this.userRepository.find({
      relations: { profile: true, posts: true },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });
    // console.log(user);
    if (!user) {
      throw new Error('User Not found');
    }
    if (user.profile) {
      await this.profileRepository.delete(user.profile.id);
    }
    return this.userRepository.delete(id);
  }
}
