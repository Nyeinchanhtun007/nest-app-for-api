import { Injectable } from '@nestjs/common';
import { CreateCatsDto } from './dto/create-cats.dto';
import { UpdateCatsDto } from './dto/update-cats.dto';

@Injectable()
export class CatsService {
  private readonly cats: string[] = ['cat1', 'cat2', 'cat3'];

  findAll(): string[] {
    return this.cats;
  }

  findOne(id: number): string {
    return this.cats[id];
  }

  //@Req vs @Body
  //@Req : access the entire request object
  //@Body : access only the body of the request

  create(createCatsDto: CreateCatsDto) {
    return this.cats.push(createCatsDto.name);
  }

  update(id: string, updateCatsDto: UpdateCatsDto): string {
    return this.cats[+id] = updateCatsDto.name;
  }

  delete(id: string): string[] {
    const deletedCat = this.cats.splice(+id, 1)[0];
    return this.cats;
  }
}

//nest g service cats
