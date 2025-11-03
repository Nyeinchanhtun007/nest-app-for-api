import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';
import { CatsEntity } from './entity/cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatsEntity)
    private readonly catsRepository: Repository<CatsEntity>,
  ) {}

  findAll(): Promise<CatsEntity[] | null> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<CatsEntity | null> {
    return this.catsRepository.findOneBy({ id });
  }

  // @Req vs @Body
  //@Req : access the entire request object
  //@Body : access only the body of the request

  create(createCatsDto: CreateCatsDto) {
    return this.catsRepository.save(createCatsDto);
  }

  update(id: string, updateCatsDto: UpdateCatsDto): Promise<UpdateResult> {
    return this.catsRepository.update(+id, updateCatsDto);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.catsRepository.delete(+id);
  }
}

//nest g service cats
