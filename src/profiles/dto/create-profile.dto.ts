import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';

export class CreateProfileDto {
  @IsString()
  bio: string;
  @IsNumber()
  age: number;
  @IsString()
  gender: string;
  @IsString()
  address: string;
  @IsString()
  phone: string;
  @IsString()
  profilePicture: string;
  @IsString()
  user: UserEntity;
}
