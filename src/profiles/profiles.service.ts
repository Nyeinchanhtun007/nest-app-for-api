import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}
  create(createProfileDto: CreateProfileDto) {
    return this.profileRepository.save(createProfileDto);
  }

  findAll() {
    return this.profileRepository.find({ relations: { user: true } });
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  update(id: number, UpdateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, UpdateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete(id);
  }
}
