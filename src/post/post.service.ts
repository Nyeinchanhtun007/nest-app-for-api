import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new Error('User Not found');
      }
      createPostDto.user = user;
    }
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find({
      relations: { user: true },
    });
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
