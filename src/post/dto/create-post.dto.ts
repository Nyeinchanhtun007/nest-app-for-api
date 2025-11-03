import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsNotEmpty({ message: 'User is required' })
  @IsString({ message: 'User must be a string' })
  userId: number;
  @IsString({ message: 'User must be a string' })
  user?: UserEntity;
}
